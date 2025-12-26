/**
 * Custom hook for chat loading state
 * Single Responsibility: Manage loading state
 * Following SRP
 */

import { useState, useEffect } from 'react';
import { Message } from 'ai/react';

export interface UseChatLoadingReturn {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function useChatLoading(messages: Message[]): UseChatLoadingReturn {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Stop loading when assistant responds
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setIsLoading(false);
    }
  }, [messages]);

  return { isLoading, setIsLoading };
}


