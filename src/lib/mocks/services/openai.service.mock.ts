/**
 * OpenAI Service Mock
 * Single Responsibility: Mock OpenAI service for testing and development
 * Following SRP and Dependency Inversion Principle
 */

import { ChatMessage } from '@/types/chat.types';
import { OPENAI_CONFIG, CHAT_LIMITS } from '@/constants/chat.constants';

export class MockOpenAIService {
  private delay: number;

  constructor(delay = 1000) {
    this.delay = delay;
  }

  /**
   * Simulates streaming chat completion
   */
  async createStreamingCompletion(messages: ChatMessage[]) {
    // Simulate delay
    await this.sleep(this.delay);

    // Get last user message
    const lastUserMessage = messages
      .filter((m) => m.role === 'user')
      .pop()?.content || '';

    // Generate mock response based on input
    const mockResponse = this.generateMockResponse(lastUserMessage, messages);

    // Return a mock streaming response
    return this.createMockStream(mockResponse);
  }

  /**
   * Generates a mock response based on the user's message
   */
  private generateMockResponse(userMessage: string, allMessages: ChatMessage[]): string {
    const lowerMessage = userMessage.toLowerCase();

    // Check if document is attached
    if (userMessage.includes('[Documento anexado:')) {
      return `Baseado no documento que você anexou, posso ver que contém informações relevantes. Analisando o conteúdo fornecido, posso ajudá-lo com suas perguntas sobre o documento. O que gostaria de saber especificamente?`;
    }

    // Simple response patterns
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
      return 'Olá! Sou o IntelliFlow, seu assistente inteligente. Como posso ajudá-lo hoje?';
    }

    if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
      return 'Posso ajudá-lo com diversas tarefas:\n\n- Responder perguntas\n- Analisar documentos\n- Explicar conceitos\n- Gerar conteúdo\n- E muito mais!\n\nO que você gostaria de fazer?';
    }

    if (lowerMessage.includes('inteligência artificial') || lowerMessage.includes('ia') || lowerMessage.includes('ai')) {
      return 'Inteligência Artificial (IA) é a capacidade de máquinas de realizar tarefas que normalmente requerem inteligência humana, como aprendizado, raciocínio e reconhecimento de padrões.';
    }

    if (lowerMessage.includes('obrigado') || lowerMessage.includes('thanks') || lowerMessage.includes('valeu')) {
      return 'De nada! Fico feliz em ajudar. Se tiver mais alguma dúvida, estou à disposição!';
    }

    // Default response
    return `Entendi sua pergunta sobre "${userMessage.substring(0, 50)}...". Esta é uma resposta simulada do mock. Em produção, esta resposta viria da API da OpenAI. Você pode me fazer perguntas sobre diversos tópicos e eu tentarei ajudá-lo da melhor forma possível.`;
  }

  /**
   * Creates a mock streaming response compatible with OpenAI format
   */
  private createMockStream(text: string): any {
    // Split text into chunks for streaming simulation
    const words = text.split(' ');

    return {
      [Symbol.asyncIterator]: async function* () {
        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          yield {
            id: `mock-${Date.now()}-${i}`,
            object: 'chat.completion.chunk',
            created: Math.floor(Date.now() / 1000),
            model: 'gpt-3.5-turbo',
            choices: [
              {
                index: 0,
                delta: {
                  content: words[i] + (i < words.length - 1 ? ' ' : ''),
                },
                finish_reason: i === words.length - 1 ? 'stop' : null,
              },
            ],
          };
        }
      },
    };
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validates API key format (same as real service)
   */
  static isValidApiKey(apiKey: string | undefined): boolean {
    return !!apiKey && apiKey.startsWith('sk-') && apiKey.length > 20;
  }
}

