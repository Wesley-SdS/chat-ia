/**
 * Chat Fixtures
 * Single Responsibility: Provide mock data for chat
 * Following SRP
 */

import { ChatMessage } from '@/types/chat.types';

export const mockMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Olá! Como você pode me ajudar?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'Olá! Sou o IntelliFlow, seu assistente inteligente. Posso ajudá-lo com diversas tarefas, como responder perguntas, analisar documentos, explicar conceitos e muito mais. Como posso ajudá-lo hoje?',
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'Explique o que é inteligência artificial de forma simples.',
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content: 'Inteligência Artificial (IA) é a capacidade de máquinas e sistemas computacionais de realizar tarefas que normalmente requerem inteligência humana. Isso inclui:\n\n1. **Aprendizado**: A IA pode aprender com dados e experiências\n2. **Raciocínio**: Pode processar informações e tomar decisões\n3. **Reconhecimento de padrões**: Identifica padrões em grandes volumes de dados\n4. **Processamento de linguagem**: Entende e gera texto em linguagem natural\n\nEm termos simples, é como dar "inteligência" a computadores para que possam pensar e agir de forma similar aos humanos, mas de forma muito mais rápida e eficiente.',
  },
];

export const mockEmptyMessages: ChatMessage[] = [];

export const mockUserMessage: ChatMessage = {
  id: 'msg-user-1',
  role: 'user',
  content: 'Esta é uma mensagem de teste do usuário.',
};

export const mockAssistantMessage: ChatMessage = {
  id: 'msg-assistant-1',
  role: 'assistant',
  content: 'Esta é uma resposta de teste do assistente. A IA está funcionando corretamente!',
};

export const mockSystemMessage: ChatMessage = {
  id: 'msg-system-1',
  role: 'system',
  content: 'Você é um assistente útil e prestativo.',
};

