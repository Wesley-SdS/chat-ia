/**
 * Chat-related types and interfaces
 * Following Single Responsibility Principle
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: MessageRole;
  content: string;
  id?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  error?: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining?: number;
  reset?: number;
}


