# 🎭 Guia Rápido - Sistema de Mocks

## 🚀 Como Ativar Mocks

### Opção 1: Variável de Ambiente (Recomendado)

Crie ou edite `.env.local`:
```env
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_MOCK_DELAY=1000
```

Execute:
```bash
npm run dev
```

### Opção 2: Script NPM

```bash
npm run dev:mock
```

### Opção 3: Automático

Se `OPENAI_API_KEY` não estiver configurada, mocks são ativados automaticamente.

---

## ✅ O Que os Mocks Fazem

- ✅ **Simulam respostas da OpenAI** - Respostas inteligentes e contextuais
- ✅ **Simulam upload de documentos** - Processa arquivos sem bibliotecas
- ✅ **Streaming simulado** - Respostas aparecem palavra por palavra
- ✅ **Sem custos** - Não usa créditos da API
- ✅ **Funciona offline** - Não precisa de internet

---

## 📝 Exemplos de Respostas Mock

| Você digita | IA responde (mock) |
|-------------|-------------------|
| "Olá" | Saudação amigável |
| "Ajuda" | Lista de capacidades |
| "IA" | Explicação sobre IA |
| "Documento anexado" | Análise do documento |

---

## 🧪 Para Testes

Os mocks são usados automaticamente em `NODE_ENV=test`:

```bash
npm test
```

---

## 📚 Documentação Completa

Veja `MOCKS_IMPLEMENTACAO.md` para documentação detalhada.

