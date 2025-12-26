/**
 * DocumentUpload Component
 * Single Responsibility: Handle document upload UI
 * Following SRP - Design similar to ChatGPT
 */

'use client';

import { useState, useRef } from 'react';
import { FiX, FiFile, FiUpload } from 'react-icons/fi';
import { PaperclipIcon } from '../ui/paperclip-icon';
import { DocumentService } from '@/lib/services/document.service';
import { UploadedDocument } from '@/types/document.types';

interface DocumentUploadProps {
  onDocumentUploaded: (document: UploadedDocument) => void;
  onDocumentRemoved: () => void;
  uploadedDocument?: UploadedDocument | null;
  disabled?: boolean;
}

export function DocumentUpload({
  onDocumentUploaded,
  onDocumentRemoved,
  uploadedDocument,
  disabled = false,
}: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validation = DocumentService.validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Arquivo inválido');
      return;
    }

    setIsUploading(true);

    try {
      // Extract text from document
      const result = await DocumentService.extractText(file);

      if (!result.success) {
        // If client-side extraction fails, upload to server for processing
        await uploadToServer(file);
      } else {
        // Create document object
        const document: UploadedDocument = {
          id: `doc-${Date.now()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          content: result.text,
          uploadedAt: new Date(),
        };

        onDocumentUploaded(document);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar arquivo');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const uploadToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer upload');
      }

      const data = await response.json();
      onDocumentUploaded(data.document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
      throw err;
    }
  };

  const handleRemove = () => {
    onDocumentRemoved();
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.md,.csv"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading || disabled}
      />

      {uploadedDocument ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 mb-2">
          <FiFile className="text-teal-600 dark:text-teal-400 flex-shrink-0" size={16} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {uploadedDocument.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {DocumentService.formatFileSize(uploadedDocument.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Remover documento"
            disabled={disabled}
          >
            <FiX className="text-gray-500 dark:text-gray-400" size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || isUploading}
          className="flex-shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Anexar documento"
          title="Anexar documento (PDF, Word, TXT, MD, CSV)"
        >
          {isUploading ? (
            <FiUpload size={20} className="animate-spin" />
          ) : (
            <PaperclipIcon size={20} />
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </>
  );
}

