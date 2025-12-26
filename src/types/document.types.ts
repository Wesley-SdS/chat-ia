/**
 * Document-related types and interfaces
 * Following Single Responsibility Principle
 */

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  uploadedAt: Date;
}

export interface DocumentUploadResult {
  success: boolean;
  document?: UploadedDocument;
  error?: string;
}

export interface DocumentProcessResult {
  success: boolean;
  text?: string;
  error?: string;
}

export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
  'text/csv',
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export type SupportedFileType = typeof SUPPORTED_FILE_TYPES[number];

