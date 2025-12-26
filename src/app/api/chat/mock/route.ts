/**
 * Mock Chat API Route
 * Single Responsibility: Provide mock chat responses for development/testing
 * Following SRP
 */

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { MessageValidator } from '@/lib/validators/message.validator';
import { ErrorHandlerService } from '@/lib/services/error-handler.service';
import { ChatRequest } from '@/types/chat.types';
import { mockMessages } from '@/lib/mocks/fixtures/chat.fixtures';

export const runtime = 'edge';

/**
 * POST handler for mock chat requests
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validationResult = MessageValidator.validateRequest(body);

    if (!validationResult.isValid) {
      return ErrorHandlerService.handleValidationError(
        validationResult.error || 'Invalid request'
      );
    }

    const request = body as ChatRequest;
    const lastUserMessage = request.messages
      .filter((m) => m.role === 'user')
      .pop()?.content || '';

    // Generate mock response
    const mockResponse = generateMockResponse(lastUserMessage, request.messages);

    // Create a simple text stream
    const stream = new ReadableStream({
      async start(controller) {
        const words = mockResponse.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
          controller.enqueue(new TextEncoder().encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    return ErrorHandlerService.handleGenericError(error);
  }
}

/**
 * Generates mock response based on user message
 */
function generateMockResponse(userMessage: string, allMessages: ChatMessage[]): string {
  const lowerMessage = userMessage.toLowerCase();

  if (userMessage.includes('[Documento anexado:')) {
    return 'Baseado no documento que você anexou, posso analisar o conteúdo e responder suas perguntas. O documento foi processado com sucesso e estou pronto para ajudá-lo.';
  }

  if (lowerMessage.includes('olá') || lowerMessage.includes('oi')) {
    return 'Olá! Sou o IntelliFlow, seu assistente inteligente. Como posso ajudá-lo hoje?';
  }

  if (lowerMessage.includes('ajuda')) {
    return 'Posso ajudá-lo com:\n\n- Responder perguntas\n- Analisar documentos\n- Explicar conceitos\n- Gerar conteúdo\n\nO que você gostaria de fazer?';
  }

  if (lowerMessage.includes('inteligência artificial') || lowerMessage.includes('ia')) {
    return 'Inteligência Artificial (IA) é a capacidade de máquinas de realizar tarefas que normalmente requerem inteligência humana, como aprendizado, raciocínio e reconhecimento de padrões.';
  }

  return `Esta é uma resposta simulada (mock). Sua mensagem foi: "${userMessage.substring(0, 100)}". Em produção, esta resposta viria da API da OpenAI.`;
}

