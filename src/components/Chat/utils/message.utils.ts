/**
 * Message utility functions
 * Single Responsibility: Message formatting and styling
 * Following SRP
 */

import { Message } from 'ai/react';

export interface MessageStyle {
  alignStyle: string;
  bgColor: string;
  roundedStyle: string;
}

/**
 * Gets styling for a message based on role and theme
 */
export function getMessageStyle(
  message: Message,
  theme: string | undefined
): MessageStyle {
  const isUser = message.role === 'user';

  return {
    alignStyle: isUser ? 'justify-end' : 'justify-start',
    bgColor: isUser
      ? 'bg-teal-500 rounded-md px-3'
      : theme === 'dark'
      ? 'dark:bg-gray-300 rounded-md px-3'
      : 'light:bg-gray-100 dark:bg-gray-300 rounded-md px-3',
    roundedStyle: isUser ? 'rounded-r' : 'rounded-l',
  };
}

/**
 * Formats message content for display
 */
export function formatMessageContent(content: string, isUser: boolean): string {
  return isUser ? content : content;
}


