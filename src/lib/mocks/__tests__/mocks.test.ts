/**
 * Mocks Tests
 * Following Test-Driven Development principles
 */

import { MockOpenAIService } from '../services/openai.service.mock';
import { MockDocumentService } from '../services/document.service.mock';
import { MockFileUtils } from '../utils/mock-file.utils';
import { mockMessages, mockUserMessage } from '../fixtures/chat.fixtures';

describe('Mock Services', () => {
  describe('MockOpenAIService', () => {
    it('should create a mock streaming completion', async () => {
      const service = new MockOpenAIService(100);
      const result = await service.createStreamingCompletion([mockUserMessage]);

      expect(result).toBeDefined();
      expect(result[Symbol.asyncIterator]).toBeDefined();
    });

    it('should generate appropriate responses for greetings', async () => {
      const service = new MockOpenAIService(0);
      const greetingMessage = { ...mockUserMessage, content: 'Olá!' };
      const result = await service.createStreamingCompletion([greetingMessage]);

      const chunks: string[] = [];
      for await (const chunk of result) {
        chunks.push(chunk.choices[0].delta.content || '');
      }

      const response = chunks.join('');
      expect(response.toLowerCase()).toContain('olá');
    });
  });

  describe('MockDocumentService', () => {
    it('should extract text from mock text file', async () => {
      const file = MockFileUtils.createMockTextFile();
      const result = await MockDocumentService.extractText(file);

      expect(result.success).toBe(true);
      expect(result.text).toBeDefined();
    });

    it('should validate files correctly', () => {
      const validFile = MockFileUtils.createMockTextFile();
      const validation = MockDocumentService.validateFile(validFile);

      expect(validation.valid).toBe(true);
    });

    it('should reject files that are too large', () => {
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.txt', {
        type: 'text/plain',
      });
      const validation = MockDocumentService.validateFile(largeFile);

      expect(validation.valid).toBe(false);
      expect(validation.error).toContain('grande');
    });
  });

  describe('MockFileUtils', () => {
    it('should create mock text files', () => {
      const file = MockFileUtils.createMockTextFile();
      expect(file.name).toBe('test.txt');
      expect(file.type).toBe('text/plain');
    });

    it('should create mock markdown files', () => {
      const file = MockFileUtils.createMockMarkdownFile();
      expect(file.name).toBe('test.md');
      expect(file.type).toBe('text/markdown');
    });
  });
});

