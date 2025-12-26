/**
 * Chat component constants
 * Single Responsibility: Store component-specific constants
 */

export const ASSISTANT_CONFIG = {
  name: 'IntelliFlow',
  bio: 'IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados.',
  avatarFallback: 'WS',
  avatarSrc: '/images/avatar.png',
} as const;

export const CHAT_UI = {
  placeholder: 'Posso ajudar?',
  emptyState: {
    greeting: '👋 Olá! Sou o',
    question: 'Como posso ajudá-lo hoje?',
  },
  errors: {
    default: 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
    generic: 'Ocorreu um erro. Por favor, tente novamente.',
  },
} as const;

export const INPUT_LIMITS = {
  maxLength: 10000,
} as const;


