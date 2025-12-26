/**
 * Document Fixtures
 * Single Responsibility: Provide mock data for documents
 * Following SRP
 */

import { UploadedDocument } from '@/types/document.types';

export const mockTextDocument: UploadedDocument = {
  id: 'doc-1',
  name: 'exemplo.txt',
  type: 'text/plain',
  size: 1024,
  content: 'Este é um documento de exemplo.\n\nContém informações importantes que podem ser analisadas pela IA.\n\nVocê pode fazer perguntas sobre este conteúdo.',
  uploadedAt: new Date('2024-01-15T10:30:00Z'),
};

export const mockMarkdownDocument: UploadedDocument = {
  id: 'doc-2',
  name: 'README.md',
  type: 'text/markdown',
  size: 2048,
  content: '# Documento Markdown\n\n## Seção 1\n\nEste é um documento em Markdown.\n\n### Subseção\n\n- Item 1\n- Item 2\n- Item 3\n\n## Seção 2\n\nMais conteúdo aqui.',
  uploadedAt: new Date('2024-01-15T11:00:00Z'),
};

export const mockCSVDocument: UploadedDocument = {
  id: 'doc-3',
  name: 'dados.csv',
  type: 'text/csv',
  size: 512,
  content: 'Nome,Idade,Cidade\nJoão,30,São Paulo\nMaria,25,Rio de Janeiro\nPedro,35,Belo Horizonte',
  uploadedAt: new Date('2024-01-15T11:30:00Z'),
};

export const mockPDFDocument: UploadedDocument = {
  id: 'doc-4',
  name: 'relatorio.pdf',
  type: 'application/pdf',
  size: 5120,
  content: '[Conteúdo extraído do PDF]\n\nRelatório Anual 2024\n\nResumo Executivo:\n- Receita: R$ 1.000.000\n- Despesas: R$ 800.000\n- Lucro: R$ 200.000\n\nAnálise Detalhada:\nO ano de 2024 foi marcado por crescimento sustentável...',
  uploadedAt: new Date('2024-01-15T12:00:00Z'),
};

export const mockDocuments: UploadedDocument[] = [
  mockTextDocument,
  mockMarkdownDocument,
  mockCSVDocument,
  mockPDFDocument,
];

