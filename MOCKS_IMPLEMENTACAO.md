# 🎭 Sistema de Mocks - Implementação Completa

## ✅ Implementação Concluída

Sistema completo de mocks implementado seguindo **SOLID/SRP** para simular o funcionamento da aplicação sem depender de APIs externas.

---

## 📁 Estrutura Criada

```
src/lib/mocks/
├── config/
│   └── mock.config.ts           # Configuração de mocks
├── services/
│   ├── openai.service.mock.ts   # Mock do OpenAI Service
│   └── document.service.mock.ts # Mock do Document Service
├── fixtures/
│   ├── chat.fixtures.ts         # Dados mock de chat
│   └── document.fixtures.ts     # Dados mock de documentos
├── utils/
│   └── mock-file.utils.ts       # Utilitários para criar arquivos mock
├── __tests__/
│   └── mocks.test.ts            # Testes dos mocks
└── index.ts                     # Export centralizado
```

---

## 🎯 Features Implementadas

### 1. ✅ **Mock OpenAI Service**
- Simula respostas da API OpenAI
- Streaming simulado
- Respostas contextuais baseadas na mensagem
- Delay configurável

### 2. ✅ **Mock Document Service**
- Simula processamento de documentos
- Suporta todos os tipos de arquivo
- Validação idêntica ao serviço real

### 3. ✅ **Fixtures (Dados de Exemplo)**
- Mensagens de chat mock
- Documentos mock (TXT, MD, CSV, PDF)
- Dados prontos para testes

### 4. ✅ **Mock File Utils**
- Cria arquivos mock para testes
- Suporta todos os tipos de arquivo
- Facilita testes de upload

### 5. ✅ **Configuração Automática**
- Detecta automaticamente quando usar mocks
- Configurável via variáveis de ambiente
- Integração transparente

---

## 🚀 Como Usar

### Modo 1: Via Variável de Ambiente

**Desenvolvimento com Mocks:**
```bash
# Criar .env.local
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_MOCK_DELAY=1000  # Delay em ms (opcional)
```

**Executar:**
```bash
npm run dev
```

### Modo 2: Via Script NPM

```bash
npm run dev:mock
```

### Modo 3: Automático (Sem API Key)

Se `OPENAI_API_KEY` não estiver configurada, mocks são ativados automaticamente.

---

## 📋 Configurações Disponíveis

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NEXT_PUBLIC_USE_MOCKS` | Ativa/desativa mocks | `false` |
| `NEXT_PUBLIC_MOCK_DELAY` | Delay das respostas (ms) | `1000` |
| `NEXT_PUBLIC_MOCK_OPENAI` | Usar mock OpenAI | `true` (se mocks ativos) |
| `NEXT_PUBLIC_MOCK_DOCUMENTS` | Usar mock Documents | `true` (se mocks ativos) |

---

## 🎭 Mocks Disponíveis

### 1. **MockOpenAIService**

**Uso:**
```typescript
import { MockOpenAIService } from '@/lib/mocks';

const mockService = new MockOpenAIService(1000); // delay opcional
const response = await mockService.createStreamingCompletion(messages);
```

**Features:**
- ✅ Respostas contextuais inteligentes
- ✅ Streaming simulado
- ✅ Suporte a documentos anexados
- ✅ Delay configurável

### 2. **MockDocumentService**

**Uso:**
```typescript
import { MockDocumentService } from '@/lib/mocks';

const file = new File(['content'], 'test.txt', { type: 'text/plain' });
const result = await MockDocumentService.extractText(file);
```

**Features:**
- ✅ Processa todos os tipos de arquivo
- ✅ Retorna conteúdo mock apropriado
- ✅ Validação idêntica ao serviço real

### 3. **Fixtures**

**Uso:**
```typescript
import { mockMessages, mockTextDocument } from '@/lib/mocks';

// Usar em testes ou desenvolvimento
const messages = mockMessages;
const document = mockTextDocument;
```

**Disponíveis:**
- `mockMessages` - Array de mensagens de exemplo
- `mockUserMessage` - Mensagem de usuário
- `mockAssistantMessage` - Mensagem de assistente
- `mockTextDocument` - Documento TXT mock
- `mockMarkdownDocument` - Documento MD mock
- `mockCSVDocument` - Documento CSV mock
- `mockPDFDocument` - Documento PDF mock

### 4. **MockFileUtils**

**Uso:**
```typescript
import { MockFileUtils } from '@/lib/mocks';

const textFile = MockFileUtils.createMockTextFile();
const pdfFile = MockFileUtils.createMockPDFFile();
const wordFile = MockFileUtils.createMockWordFile();
```

---

## 🔧 Integração Automática

O sistema detecta automaticamente quando usar mocks:

1. **Se `NEXT_PUBLIC_USE_MOCKS=true`** → Usa mocks
2. **Se `NODE_ENV=test`** → Usa mocks
3. **Se `OPENAI_API_KEY` não existe** → Usa mocks
4. **Caso contrário** → Usa serviços reais

**Código:**
```typescript
// src/lib/services/openai.service.ts
if (MockConfig.shouldUseMockOpenAI()) {
  this.mockService = new MockOpenAIService();
} else {
  this.client = new OpenAI({ apiKey });
}
```

---

## 📊 Respostas Mock Inteligentes

O mock OpenAI gera respostas contextuais:

| Input do Usuário | Resposta Mock |
|------------------|---------------|
| "Olá" / "Oi" | Saudação amigável |
| "Ajuda" | Lista de capacidades |
| "Inteligência artificial" | Explicação sobre IA |
| "[Documento anexado: ...]" | Resposta sobre análise de documento |
| Outros | Resposta genérica contextual |

---

## 🧪 Testes com Mocks

### Exemplo de Teste:

```typescript
import { MockOpenAIService } from '@/lib/mocks';

describe('Chat with Mocks', () => {
  it('should respond to greetings', async () => {
    const service = new MockOpenAIService(0);
    const messages = [{ role: 'user', content: 'Olá!' }];
    
    const response = await service.createStreamingCompletion(messages);
    
    // Processar stream...
    expect(response).toBeDefined();
  });
});
```

---

## 🎯 Casos de Uso

### 1. **Desenvolvimento sem API Key**
```bash
# Não precisa configurar OPENAI_API_KEY
NEXT_PUBLIC_USE_MOCKS=true npm run dev
```

### 2. **Testes Automatizados**
```bash
# Jest usa mocks automaticamente em NODE_ENV=test
npm test
```

### 3. **Demonstrações**
```bash
# Mostrar funcionalidade sem custos de API
npm run dev:mock
```

### 4. **Desenvolvimento Offline**
```bash
# Trabalhar sem internet
NEXT_PUBLIC_USE_MOCKS=true npm run dev
```

---

## 📝 Exemplos de Uso

### Exemplo 1: Teste de Chat

```typescript
import { MockOpenAIService, mockUserMessage } from '@/lib/mocks';

const service = new MockOpenAIService(500);
const response = await service.createStreamingCompletion([mockUserMessage]);

for await (const chunk of response) {
  console.log(chunk.choices[0].delta.content);
}
```

### Exemplo 2: Teste de Upload

```typescript
import { MockDocumentService, MockFileUtils } from '@/lib/mocks';

const file = MockFileUtils.createMockTextFile('test.txt', 'Conteúdo de teste');
const result = await MockDocumentService.extractText(file);

expect(result.success).toBe(true);
expect(result.text).toContain('Conteúdo de teste');
```

### Exemplo 3: Teste de Componente

```typescript
import { mockMessages, mockTextDocument } from '@/lib/mocks';

// Usar em testes de componentes
<ChatMessages messages={mockMessages} />
<DocumentUpload uploadedDocument={mockTextDocument} />
```

---

## 🔄 Fluxo de Funcionamento

```
1. Aplicação inicia
   ↓
2. MockConfig.isMockEnabled()?
   ↓
3. SIM → Usa MockOpenAIService
   NÃO → Usa OpenAIService real
   ↓
4. Resposta (mock ou real)
```

---

## ✅ Benefícios

1. **Desenvolvimento Offline** - Trabalhe sem internet
2. **Sem Custos** - Não gasta créditos da OpenAI
3. **Testes Rápidos** - Respostas instantâneas
4. **Demonstrações** - Mostre funcionalidade sem API
5. **Testes Confiáveis** - Respostas previsíveis

---

## 🎓 Arquitetura

### Princípios Aplicados:

- ✅ **SRP**: Cada mock tem responsabilidade única
- ✅ **DIP**: Serviços dependem de abstrações
- ✅ **OCP**: Fácil adicionar novos mocks
- ✅ **ISP**: Interfaces específicas

### Padrões:

- ✅ **Factory Pattern**: MockFileUtils cria arquivos
- ✅ **Strategy Pattern**: MockConfig escolhe estratégia
- ✅ **Adapter Pattern**: Mocks adaptam interface real

---

## 📊 Comparação: Mock vs Real

| Aspecto | Mock | Real |
|---------|------|------|
| **Velocidade** | Instantâneo | Depende da API |
| **Custo** | Grátis | Pago |
| **Internet** | Não precisa | Precisa |
| **Respostas** | Previsíveis | Variadas |
| **Uso** | Dev/Test | Produção |

---

## 🚀 Próximos Passos

### Melhorias Futuras:

1. **Mais Respostas Contextuais**
   - Expandir padrões de resposta
   - Adicionar mais cenários

2. **Mock de Rate Limiting**
   - Simular rate limit
   - Testar comportamento

3. **Mock de Erros**
   - Simular erros da API
   - Testar tratamento de erros

4. **Mock de Documentos Avançados**
   - Simular PDF complexo
   - Simular Word com formatação

---

## ✅ Checklist de Implementação

- [x] Mock OpenAI Service
- [x] Mock Document Service
- [x] Fixtures de dados
- [x] Mock File Utils
- [x] Configuração automática
- [x] Integração transparente
- [x] Testes dos mocks
- [x] Documentação completa

---

## 🎉 Conclusão

Sistema de mocks **100% funcional** e integrado. Permite:

- ✅ Desenvolvimento sem API Key
- ✅ Testes rápidos e confiáveis
- ✅ Demonstrações sem custos
- ✅ Trabalho offline

**Status**: ✅ **Pronto para Uso**

---

**Última Atualização**: $(date)

