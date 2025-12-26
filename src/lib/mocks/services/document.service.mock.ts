/**
 * Document Service Mock
 * Single Responsibility: Mock document service for testing
 * Following SRP
 */

import { DocumentProcessResult } from '@/types/document.types';
import { mockTextDocument, mockMarkdownDocument, mockCSVDocument } from '../fixtures/document.fixtures';

export class MockDocumentService {
  /**
   * Mocks text extraction from file
   */
  static async extractText(file: File): Promise<DocumentProcessResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock content based on file type
    switch (file.type) {
      case 'text/plain':
        return {
          success: true,
          text: mockTextDocument.content,
        };

      case 'text/markdown':
        return {
          success: true,
          text: mockMarkdownDocument.content,
        };

      case 'text/csv':
        return {
          success: true,
          text: mockCSVDocument.content,
        };

      case 'application/pdf':
        return {
          success: true,
          text: '[Conteúdo simulado de PDF]\n\nEste é um documento PDF de exemplo. Em produção, o texto seria extraído usando uma biblioteca como pdf-parse.',
        };

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return {
          success: true,
          text: '[Conteúdo simulado de Word]\n\nEste é um documento Word de exemplo. Em produção, o texto seria extraído usando uma biblioteca como mammoth.',
        };

      default:
        return {
          success: false,
          error: `Tipo de arquivo não suportado: ${file.type}`,
        };
    }
  }

  /**
   * Validates file (same as real service)
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > 10 * 1024 * 1024) {
      return {
        valid: false,
        error: 'Arquivo muito grande. Tamanho máximo: 10MB',
      };
    }

    const supportedTypes: string[] = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
      'text/csv',
    ];

    if (!supportedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Tipo de arquivo não suportado: ${file.type}`,
      };
    }

    return { valid: true };
  }

  /**
   * Formats file size (same as real service)
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

