/**
 * Custom hook for chat error handling
 * Single Responsibility: Handle chat errors
 * Following SRP and Separation of Concerns
 */

import { useState, useEffect } from 'react';
import { Message } from 'ai/react';

export interface UseChatErrorReturn {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export function useChatError(chatError: Error | undefined): UseChatErrorReturn {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chatError) {
      setError(chatError.message || 'Ocorreu um erro. Por favor, tente novamente.');
    }
  }, [chatError]);

  const clearError = () => setError(null);

  return { error, setError, clearError };
}


