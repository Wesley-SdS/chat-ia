# 🤖 IntelliFlow - Assistente Inteligente

IntelliFlow é uma aplicação de chat com IA construída com Next.js 16, TypeScript e OpenAI API. Oferece uma interface moderna e intuitiva para conversar com inteligência artificial de forma natural e eficiente.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--Turbo-green?style=flat-square)

## ✨ Features

- 💬 **Chat em tempo real** com streaming de respostas
- 🌙 **Dark Mode** com suporte a tema claro/escuro
- 📱 **Responsivo** - Funciona perfeitamente em mobile e desktop
- ⚡ **Performance otimizada** com Edge Runtime
- 🔒 **Seguro** - Validação de input e tratamento de erros
- ♿ **Acessível** - Seguindo melhores práticas de acessibilidade
- 🎨 **UI Moderna** - Interface limpa e intuitiva

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ ou superior
- npm, yarn, pnpm ou bun
- Chave de API da OpenAI ([obtenha aqui](https://platform.openai.com/api-keys))

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/chat-ia.git
   cd chat-ia
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` e adicione sua chave da OpenAI:
   ```env
   OPENAI_API_KEY=sk-sua-chave-aqui
   NODE_ENV=development
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Abra [http://localhost:3000](http://localhost:3000)** no seu navegador

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
```

## 🏗️ Estrutura do Projeto

```
chat-ia/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # API route para chat
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Página inicial
│   │   ├── global.css            # Estilos globais
│   │   └── sitemap.ts            # Sitemap gerado
│   ├── components/
│   │   ├── Chat.tsx              # Componente principal de chat
│   │   ├── Header.tsx            # Cabeçalho
│   │   ├── Navbar.tsx            # Barra de navegação
│   │   ├── ThemeToggle.tsx       # Toggle de tema
│   │   ├── footer.tsx            # Rodapé
│   │   └── ui/                   # Componentes UI (shadcn/ui)
│   └── lib/
│       └── utils.ts              # Utilitários
├── public/
│   └── images/                   # Imagens estáticas
├── .env.example                  # Exemplo de variáveis de ambiente
├── next.config.js               # Configuração do Next.js
├── tailwind.config.ts           # Configuração do Tailwind
└── package.json                 # Dependências
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `OPENAI_API_KEY` | Chave de API da OpenAI | ✅ Sim |
| `NODE_ENV` | Ambiente de execução (`development` ou `production`) | ❌ Não |
| `NEXT_PUBLIC_APP_URL` | URL pública da aplicação (para SEO) | ❌ Não |

### Personalização

- **Nome do Assistente**: Edite `assistantName` em `src/components/Chat.tsx`
- **Modelo da IA**: Altere o modelo em `src/app/api/chat/route.ts` (linha 17)
- **Cores e Tema**: Personalize em `tailwind.config.ts` e `src/app/global.css`

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Adicione a variável de ambiente `OPENAI_API_KEY`
4. Deploy automático! 🎉

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- **Netlify**: Configure build command como `npm run build` e publish directory como `.next`
- **Railway**: Deploy automático ao fazer push
- **Docker**: Use a imagem oficial do Next.js

## 🔒 Segurança

- ✅ Validação de input na API
- ✅ Limites de tamanho de mensagem (10.000 caracteres)
- ✅ Limite de mensagens por conversa (50 mensagens)
- ✅ Headers de segurança configurados
- ✅ Validação de variáveis de ambiente
- ✅ Tratamento de erros robusto

## 🧪 Testes

> ⚠️ **Nota**: Testes ainda não foram implementados. Veja a seção de [Contribuindo](#-contribuindo) para ajudar.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Wesley Santos**

- GitHub: [@Wesley-SdS](https://github.com/Wesley-SdS)
- LinkedIn: [Wesley Santos](https://www.linkedin.com/in/wesley-sds/)

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📊 Roadmap

- [ ] Implementar testes unitários e E2E
- [ ] Adicionar rate limiting
- [ ] Histórico de conversas persistente
- [ ] Suporte a múltiplos modelos de IA
- [ ] Exportar conversas
- [ ] Modo de voz
- [ ] Integração com mais providers de IA

## 🐛 Problemas Conhecidos

- Rate limiting ainda não implementado (planejado)
- Testes não implementados (planejado)

## 📚 Recursos

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação OpenAI](https://platform.openai.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui](https://ui.shadcn.com)

## ⚠️ Avisos

- Este projeto requer uma chave de API da OpenAI, que pode ter custos associados
- Certifique-se de configurar limites de uso adequados na sua conta OpenAI
- Não compartilhe sua chave de API publicamente

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
