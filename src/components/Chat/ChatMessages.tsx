/**
 * ChatMessages Component
 * Single Responsibility: Render list of messages
 * Following SRP
 */

import { Message } from 'ai/react';
import { ChatMessage } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  theme?: string;
}

export function ChatMessages({ messages, theme }: ChatMessagesProps) {
  return (
    <div className="space-y-4 text-slate-950">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} theme={theme} />
      ))}
    </div>
  );
}


