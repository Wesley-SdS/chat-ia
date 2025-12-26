/**
 * ChatMessage Component
 * Single Responsibility: Render a single message
 * Following SRP
 */

import { Message } from 'ai/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getMessageStyle } from './utils/message.utils';
import { ASSISTANT_CONFIG } from './constants/chat.constants';

interface ChatMessageProps {
  message: Message;
  theme?: string;
}

export function ChatMessage({ message, theme }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const style = getMessageStyle(message, theme);

  return (
    <div key={message.id} className={`flex gap-3 text-sm ${style.alignStyle}`}>
      {!isUser && (
        <Avatar>
          <AvatarFallback>{ASSISTANT_CONFIG.avatarFallback}</AvatarFallback>
          <AvatarImage src={ASSISTANT_CONFIG.avatarSrc} alt={ASSISTANT_CONFIG.name} />
        </Avatar>
      )}

      <div className={`p-2 ${style.bgColor} ${style.roundedStyle}`}>
        <p className="leading-relaxed text-slate-950">
          {isUser ? (
            message.content
          ) : (
            <>
              <span className="block font-bold text-orange-600">
                {ASSISTANT_CONFIG.name}:
              </span>
              {message.content}
            </>
          )}
        </p>
      </div>
    </div>
  );
}


