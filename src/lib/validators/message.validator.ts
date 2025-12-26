/**
 * Message Validator
 * Single Responsibility: Validate chat messages
 * Following SRP and Open/Closed Principle
 */

import { ChatMessage, ValidationResult } from '@/types/chat.types';
import { CHAT_LIMITS, VALID_MESSAGE_ROLES, MessageRole } from '@/constants/chat.constants';

export class MessageValidator {
  /**
   * Validates a single message
   */
  static validateMessage(message: unknown): ValidationResult {
    if (!message || typeof message !== 'object') {
      return {
        isValid: false,
        error: 'Message must be an object',
      };
    }

    const msg = message as Partial<ChatMessage>;

    if (!msg.role || typeof msg.role !== 'string') {
      return {
        isValid: false,
        error: 'Message must have a valid role',
      };
    }

    if (!VALID_MESSAGE_ROLES.includes(msg.role as MessageRole)) {
      return {
        isValid: false,
        error: `Message role must be one of: ${VALID_MESSAGE_ROLES.join(', ')}`,
      };
    }

    if (!msg.content || typeof msg.content !== 'string') {
      return {
        isValid: false,
        error: 'Message must have a valid content string',
      };
    }

    if (msg.content.length > CHAT_LIMITS.MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        error: `Message content exceeds maximum length of ${CHAT_LIMITS.MAX_MESSAGE_LENGTH} characters`,
      };
    }

    if (msg.content.trim().length === 0) {
      return {
        isValid: false,
        error: 'Message content cannot be empty',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates an array of messages
   */
  static validateMessages(messages: unknown): ValidationResult {
    if (!Array.isArray(messages)) {
      return {
        isValid: false,
        error: 'Messages must be an array',
      };
    }

    if (messages.length === 0) {
      return {
        isValid: false,
        error: 'Messages array cannot be empty',
      };
    }

    if (messages.length > CHAT_LIMITS.MAX_MESSAGES) {
      return {
        isValid: false,
        error: `Messages array cannot exceed ${CHAT_LIMITS.MAX_MESSAGES} messages`,
      };
    }

    for (let i = 0; i < messages.length; i++) {
      const result = this.validateMessage(messages[i]);
      if (!result.isValid) {
        return {
          isValid: false,
          error: `Message at index ${i}: ${result.error}`,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Validates request body structure
   */
  static validateRequest(body: unknown): ValidationResult {
    if (!body || typeof body !== 'object') {
      return {
        isValid: false,
        error: 'Request body must be an object',
      };
    }

    const request = body as Partial<{ messages: unknown }>;

    if (!request.messages) {
      return {
        isValid: false,
        error: 'Request body must contain a messages array',
      };
    }

    return this.validateMessages(request.messages);
  }
}

