/**
 * Chat Component (Main)
 * Single Responsibility: Orchestrate chat functionality
 * Following SRP and Composition Pattern
 */

'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatError } from './ChatError';
import { ChatLoading } from './ChatLoading';
import { ChatEmpty } from './ChatEmpty';
import { ChatInput } from './ChatInput';
import { useChatError } from './hooks/useChatError';
import { useChatLoading } from './hooks/useChatLoading';
import { CHAT_UI } from './constants/chat.constants';
import { UploadedDocument } from '@/types/document.types';

function ChatContent() {
  const { theme } = useTheme();
  const [uploadedDocument, setUploadedDocument] = useState<UploadedDocument | null>(null);

  const { messages, input, handleInputChange, error: chatError, append, setInput } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: () => {
      // Loading state is handled by useChatLoading hook
    },
  });

  const { error, clearError } = useChatError(chatError);
  const { isLoading, setIsLoading } = useChatLoading(messages);

  const handleDocumentUploaded = (document: UploadedDocument) => {
    setUploadedDocument(document);
  };

  const handleDocumentRemoved = () => {
    setUploadedDocument(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    setIsLoading(true);

    // If there's an uploaded document, include it in the message
    let messageContent = input;
    if (uploadedDocument && uploadedDocument.content) {
      messageContent = `[Documento anexado: ${uploadedDocument.name}]\n\nConteúdo do documento:\n${uploadedDocument.content}\n\n---\n\nPergunta do usuário: ${input}`;
    }

    // Use append to send message with document context
    await append({
      role: 'user',
      content: messageContent,
    });

    // Clear input after sending
    setInput('');
  };

  return (
    <Card className="dark:bg-dark mx-1 lg:mx-10 w-full lg:w-[900px] h-full flex flex-col border-dotted border-teal-500">
      <ChatHeader />
      <CardContent>
        {messages.length === 0 && <ChatEmpty />}
        <ChatMessages messages={messages} theme={theme} />
        {isLoading && <ChatLoading />}
        {error && <ChatError error={error} onClose={clearError} />}
      </CardContent>
      <CardFooter>
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          uploadedDocument={uploadedDocument}
          onDocumentUploaded={handleDocumentUploaded}
          onDocumentRemoved={handleDocumentRemoved}
        />
      </CardFooter>
    </Card>
  );
}

export default function Chat() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ChatContent />
    </ThemeProvider>
  );
}


