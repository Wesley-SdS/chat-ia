/**
 * Chat-related constants
 * Following DRY principle - single source of truth
 */

export const CHAT_LIMITS = {
  MAX_MESSAGES: 50,
  MAX_MESSAGE_LENGTH: 10000,
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
} as const;

export type MessageRole = 'user' | 'assistant' | 'system';

export const VALID_MESSAGE_ROLES: MessageRole[] = ['user', 'assistant', 'system'];

export const OPENAI_CONFIG = {
  MODEL: 'gpt-3.5-turbo',
  STREAM: true,
} as const;

export const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS: 10,
  WINDOW_MS: 60 * 1000, // 1 minute
} as const;

