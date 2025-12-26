/**
 * Message Validator Tests
 * Following Test-Driven Development principles
 */

import { MessageValidator } from '../message.validator';

// Simple test framework for demonstration
// In production, use Jest or Vitest
function describe(name: string, fn: () => void) {
  console.log(`\n${name}`);
  fn();
}

function it(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}:`, error);
  }
}

function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toContain(substring: string) {
      if (!String(actual).includes(substring)) {
        throw new Error(`Expected "${actual}" to contain "${substring}"`);
      }
    },
  };
}

describe('MessageValidator', () => {
  describe('validateMessage', () => {
    it('should validate a correct user message', () => {
      const message = { role: 'user', content: 'Hello' };
      const result = MessageValidator.validateMessage(message);
      expect(result.isValid).toBe(true);
    });

    it('should reject message without role', () => {
      const message = { content: 'Hello' };
      const result = MessageValidator.validateMessage(message);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('role');
    });

    it('should reject message with invalid role', () => {
      const message = { role: 'invalid', content: 'Hello' };
      const result = MessageValidator.validateMessage(message);
      expect(result.isValid).toBe(false);
    });

    it('should reject empty message content', () => {
      const message = { role: 'user', content: '   ' };
      const result = MessageValidator.validateMessage(message);
      expect(result.isValid).toBe(false);
    });

    it('should reject message exceeding max length', () => {
      const longContent = 'a'.repeat(10001);
      const message = { role: 'user', content: longContent };
      const result = MessageValidator.validateMessage(message);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateMessages', () => {
    it('should validate correct messages array', () => {
      const messages = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
      ];
      const result = MessageValidator.validateMessages(messages);
      expect(result.isValid).toBe(true);
    });

    it('should reject non-array input', () => {
      const result = MessageValidator.validateMessages({});
      expect(result.isValid).toBe(false);
    });

    it('should reject empty array', () => {
      const result = MessageValidator.validateMessages([]);
      expect(result.isValid).toBe(false);
    });

    it('should reject array exceeding max messages', () => {
      const messages = Array(51).fill({ role: 'user', content: 'test' });
      const result = MessageValidator.validateMessages(messages);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateRequest', () => {
    it('should validate correct request', () => {
      const request = {
        messages: [{ role: 'user', content: 'Hello' }],
      };
      const result = MessageValidator.validateRequest(request);
      expect(result.isValid).toBe(true);
    });

    it('should reject request without messages', () => {
      const request = {};
      const result = MessageValidator.validateRequest(request);
      expect(result.isValid).toBe(false);
    });
  });
});

