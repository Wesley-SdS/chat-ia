/**
 * ChatHeader Component
 * Single Responsibility: Display chat header
 * Following SRP
 */

import { CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ASSISTANT_CONFIG } from './constants/chat.constants';

export function ChatHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-orange-600">{ASSISTANT_CONFIG.name}</CardTitle>
      <CardDescription>{ASSISTANT_CONFIG.bio}</CardDescription>
    </CardHeader>
  );
}


