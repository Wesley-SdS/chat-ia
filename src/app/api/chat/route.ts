/**
 * Chat API Route
 * Following SRP: Orchestrates services, doesn't contain business logic
 */

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { MessageValidator } from '@/lib/validators/message.validator';
import { OpenAIService } from '@/lib/services/openai.service';
import { ErrorHandlerService } from '@/lib/services/error-handler.service';
import { RateLimiterService } from '@/lib/services/rate-limiter.service';
import { EnvironmentConfig } from '@/lib/config/environment.config';
import { ChatRequest } from '@/types/chat.types';
import { MockConfig } from '@/lib/mocks/config/mock.config';

// Validate environment on module load (skip if mocks enabled)
if (!MockConfig.isMockEnabled()) {
  EnvironmentConfig.validate();
}

// Initialize services (following Dependency Injection pattern)
let apiKey = 'mock-key';
if (!MockConfig.isMockEnabled()) {
  try {
    apiKey = EnvironmentConfig.getOpenAIApiKey();
  } catch {
    // If validation fails, use mock
    apiKey = 'mock-key';
  }
}
const openAIService = new OpenAIService(apiKey);
const rateLimiter = new RateLimiterService();

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

/**
 * POST handler for chat requests
 * Orchestrates validation, rate limiting, and OpenAI service
 */
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await parseRequestBody(req);
    if (!body) {
      return ErrorHandlerService.handleJsonParseError();
    }

    // Validate request structure
    const validationResult = MessageValidator.validateRequest(body);
    if (!validationResult.isValid) {
      return ErrorHandlerService.handleValidationError(
        validationResult.error || 'Invalid request'
      );
    }

    // Rate limiting
    const clientId = RateLimiterService.getClientIdentifier(req);
    const rateLimitResult = rateLimiter.checkLimit(clientId);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          reset: rateLimitResult.reset,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset?.toString() || '',
          },
        }
      );
    }

    // Create streaming completion
    const request = body as ChatRequest;
    
    // Enhance messages with system context if document is detected
    const enhancedMessages = request.messages.map((msg) => {
      if (msg.role === 'user' && msg.content.includes('[Documento anexado:')) {
        // Add system context for document analysis
        return {
          ...msg,
          content: `Você é um assistente especializado em análise de documentos. Analise o documento fornecido e responda às perguntas do usuário com base no conteúdo do documento.\n\n${msg.content}`,
        };
      }
      return msg;
    });

    const response = await openAIService.createStreamingCompletion(enhancedMessages);
    const stream = OpenAIStream(response);

    // Return streaming response with rate limit headers
    return new StreamingTextResponse(stream, {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
        'X-RateLimit-Reset': rateLimitResult.reset?.toString() || '',
      },
    });
  } catch (error) {
    // Handle OpenAI-specific errors
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return ErrorHandlerService.handleOpenAIError(error);
    }

    // Handle all other errors
    return ErrorHandlerService.handleGenericError(error);
  }
}

/**
 * Parses request body with error handling
 * Single Responsibility: Parse JSON safely
 */
async function parseRequestBody(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
