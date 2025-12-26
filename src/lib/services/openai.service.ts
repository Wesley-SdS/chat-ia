/**
 * OpenAI Service
 * Single Responsibility: Handle OpenAI API interactions
 * Following SRP and Dependency Inversion Principle
 */

import OpenAI from 'openai';
import { ChatMessage } from '@/types/chat.types';
import { OPENAI_CONFIG, CHAT_LIMITS } from '@/constants/chat.constants';
import { MockOpenAIService } from '../mocks/services/openai.service.mock';
import { MockConfig } from '../mocks/config/mock.config';

export class OpenAIService {
  private client: OpenAI | null = null;
  private mockService: MockOpenAIService | null = null;

  constructor(apiKey: string) {
    if (MockConfig.shouldUseMockOpenAI()) {
      // Use mock service
      this.mockService = new MockOpenAIService(MockConfig.getMockDelay());
    } else {
      // Use real OpenAI service
      if (!apiKey) {
        throw new Error('OpenAI API key is required');
      }
      this.client = new OpenAI({ apiKey });
    }
  }

  /**
   * Creates a streaming chat completion
   */
  async createStreamingCompletion(messages: ChatMessage[]) {
    if (this.mockService) {
      return this.mockService.createStreamingCompletion(messages);
    }

    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    return this.client.chat.completions.create({
      model: OPENAI_CONFIG.MODEL,
      stream: OPENAI_CONFIG.STREAM,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: CHAT_LIMITS.MAX_TOKENS,
      temperature: CHAT_LIMITS.TEMPERATURE,
    });
  }

  /**
   * Validates API key format (basic validation)
   */
  static isValidApiKey(apiKey: string | undefined): boolean {
    return !!apiKey && apiKey.startsWith('sk-') && apiKey.length > 20;
  }
}
