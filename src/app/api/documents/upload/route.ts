/**
 * Document Upload API Route
 * Single Responsibility: Handle document upload and processing
 * Following SRP
 */

import { NextRequest } from 'next/server';
import { ErrorHandlerService } from '@/lib/services/error-handler.service';
import { RateLimiterService } from '@/lib/services/rate-limiter.service';
import { EnvironmentConfig } from '@/lib/config/environment.config';
import { DocumentService } from '@/lib/services/document.service';
import { MAX_FILE_SIZE, SUPPORTED_FILE_TYPES } from '@/types/document.types';

// Validate environment on module load
EnvironmentConfig.validate();

// Initialize rate limiter
const rateLimiter = new RateLimiterService();

// IMPORTANT! Set the runtime to edge (but file processing may need node runtime)
export const runtime = 'edge';
export const maxDuration = 30; // 30 seconds for file processing

/**
 * POST handler for document upload
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = RateLimiterService.getClientIdentifier(req);
    const rateLimitResult = rateLimiter.checkLimit(clientId);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return ErrorHandlerService.handleValidationError('Nenhum arquivo fornecido');
    }

    // Validate file
    const validation = DocumentService.validateFile(file);
    if (!validation.valid) {
      return ErrorHandlerService.handleValidationError(validation.error || 'Arquivo inválido');
    }

    // Process file (extract text)
    // Note: For PDF and Word, you'll need server-side libraries
    // For now, we'll handle text files and return a placeholder for others
    let text: string | undefined;

    if (file.type.startsWith('text/')) {
      text = await file.text();
    } else {
      // For PDF/Word, return a message that processing is needed
      // In production, use libraries like pdf-parse, mammoth, etc.
      return new Response(
        JSON.stringify({
          error: 'Processamento de PDF/Word requer bibliotecas adicionais',
          message: 'Por favor, use arquivos de texto (TXT, Markdown, CSV) ou implemente processamento de PDF/Word no servidor.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create document object
    const document = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      content: text,
      uploadedAt: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify({
        success: true,
        document,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return ErrorHandlerService.handleGenericError(error);
  }
}

