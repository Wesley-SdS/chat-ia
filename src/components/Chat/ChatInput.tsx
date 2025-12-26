/**
 * ChatInput Component
 * Single Responsibility: Handle message input
 * Following SRP
 */

import { IoIosSend } from 'react-icons/io';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DocumentUpload } from './DocumentUpload';
import { CHAT_UI, INPUT_LIMITS } from './constants/chat.constants';
import { UploadedDocument } from '@/types/document.types';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  uploadedDocument?: UploadedDocument | null;
  onDocumentUploaded?: (document: UploadedDocument) => void;
  onDocumentRemoved?: () => void;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  uploadedDocument,
  onDocumentUploaded,
  onDocumentRemoved,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="w-full space-y-2">
      {onDocumentUploaded && onDocumentRemoved && uploadedDocument && (
        <DocumentUpload
          onDocumentUploaded={onDocumentUploaded}
          onDocumentRemoved={onDocumentRemoved}
          uploadedDocument={uploadedDocument}
          disabled={isLoading}
        />
      )}
      <form className="w-full flex items-center gap-2" onSubmit={handleSubmit}>
        {onDocumentUploaded && onDocumentRemoved && (
          <DocumentUpload
            onDocumentUploaded={onDocumentUploaded}
            onDocumentRemoved={onDocumentRemoved}
            uploadedDocument={uploadedDocument || null}
            disabled={isLoading}
          />
        )}
        <Input
          className="dark:bg-gray-900 flex-1"
          placeholder={CHAT_UI.placeholder}
          value={input}
          onChange={onInputChange}
          disabled={isLoading}
          maxLength={INPUT_LIMITS.maxLength}
          aria-label="Digite sua mensagem"
        />
        <Button
          className="bg-orange-600 hover:bg-orange-800 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Enviar mensagem"
        >
          <IoIosSend />
        </Button>
      </form>
    </div>
  );
}


