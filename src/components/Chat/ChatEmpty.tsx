/**
 * ChatEmpty Component
 * Single Responsibility: Display empty state
 * Following SRP
 */

import { ASSISTANT_CONFIG, CHAT_UI } from './constants/chat.constants';

export function ChatEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
      <p className="text-lg mb-2">
        {CHAT_UI.emptyState.greeting} {ASSISTANT_CONFIG.name}
      </p>
      <p className="text-sm">{CHAT_UI.emptyState.question}</p>
    </div>
  );
}


