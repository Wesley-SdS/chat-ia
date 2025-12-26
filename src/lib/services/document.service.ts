/**
 * Document Service
 * Single Responsibility: Handle document processing
 * Following SRP
 */

import { DocumentProcessResult, SupportedFileType } from '@/types/document.types';

export class DocumentService {
  /**
   * Extracts text from a file based on its type
   */
  static async extractText(file: File): Promise<DocumentProcessResult> {
    try {
      const fileType = file.type as SupportedFileType;

      switch (fileType) {
        case 'text/plain':
        case 'text/markdown':
        case 'text/csv':
          return await this.extractTextFromTextFile(file);

        case 'application/pdf':
          return await this.extractTextFromPDF(file);

        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await this.extractTextFromWord(file);

        default:
          return {
            success: false,
            error: `Tipo de arquivo não suportado: ${fileType}`,
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao processar documento',
      };
    }
  }

  /**
   * Extracts text from plain text files
   */
  private static async extractTextFromTextFile(file: File): Promise<DocumentProcessResult> {
    try {
      const text = await file.text();
      return {
        success: true,
        text: text.trim(),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao ler arquivo de texto',
      };
    }
  }

  /**
   * Extracts text from PDF files
   * Note: For production, consider using a PDF parsing library
   */
  private static async extractTextFromPDF(file: File): Promise<DocumentProcessResult> {
    // For now, return a placeholder
    // In production, use a library like pdf-parse or pdfjs-dist
    return {
      success: false,
      error: 'Processamento de PDF requer biblioteca adicional. Use a API de upload para processar no servidor.',
    };
  }

  /**
   * Extracts text from Word documents
   * Note: For production, consider using a Word parsing library
   */
  private static async extractTextFromWord(file: File): Promise<DocumentProcessResult> {
    // For now, return a placeholder
    // In production, use a library like mammoth for .docx
    return {
      success: false,
      error: 'Processamento de Word requer biblioteca adicional. Use a API de upload para processar no servidor.',
    };
  }

  /**
   * Validates file before upload
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > 10 * 1024 * 1024) {
      return {
        valid: false,
        error: 'Arquivo muito grande. Tamanho máximo: 10MB',
      };
    }

    // Check file type
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
        error: `Tipo de arquivo não suportado: ${file.type}. Tipos suportados: PDF, Word, TXT, Markdown, CSV`,
      };
    }

    return { valid: true };
  }

  /**
   * Formats file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

