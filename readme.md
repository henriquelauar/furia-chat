# FURIA Chat

**FURIA Chat** é uma aplicação de chat em tempo real feita para fãs da FURIA Esports interagirem entre si e com a mascote Pantera, utilizando tecnologias modernas como React, Supabase, e integração com IA.

## 🔥 Tecnologias Utilizadas

- **React** (com TypeScript)
- **Vite** (ambiente de build rápido)
- **Bootstrap** (estilização responsiva)
- **Supabase** (banco de dados e real-time backend)
- **Axios** (requisições HTTP)
- **OpenRouter AI** (integração com o modelo GPT-3.5-turbo)
- **React Router Dom** (navegação entre páginas)
- **Vercel** (deploy da aplicação)

## 📂 Estrutura de Pastas

```bash
src/
├── assets/         # Imagens e ícones
├── components/     # Componentes reutilizáveis (Sidebar, Chat, HamburgerMenu, etc.)
├── hooks/          # Hooks personalizados (useChat, usePrivateChat, useUsername, usePanteraResponse)
├── pages/          # Páginas principais (ChatPage, PrivateChatPage, etc.)
├── services/       # Serviços externos (authService.ts)
├── supabase/       # Client supabase (supabaseService.ts)
├── App.tsx         # Estrutura principal de rotas
├── main.tsx        # Ponto de entrada do app
```

## ⚙️ Funcionalidades
🔐 Login rápido: Login simples usando o nome de usuário.

💬 Chat Público: Todos os usuários podem conversar em um canal principal.

📩 Chat Privado: Envio de mensagens diretas entre usuários.

🤖 Chat com IA (Pantera): A mascote oficial da FURIA responde perguntas sobre o time de CS.

📱 Responsividade total: Layout adaptado para desktop e mobile, com sidebar offcanvas (hambúrguer) no mobile.

🚀 Deploy Fácil: Aplicação otimizada para rodar em produção (hospedado no Vercel).

## 🛠️ Como rodar o projeto localmente
Clone o repositório:

```bash
git clone https://github.com/seu-usuario/furia-chat.git
```

## Instale as dependências:

```bash
npm install
# ou
yarn install
```
## Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto:

VITE_SUPABASE_URL=your-supabase-url

VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

VITE_OPENAI_API=your-openai-api-key

## Rode o projeto:

```bash
npm run dev
# ou
yarn dev
```

## 🌐 Deploy
A aplicação pode ser facilmente hospedada no Vercel. Basta conectar seu repositório GitHub no painel do Vercel, configurar as variáveis de ambiente e publicar.

## 🧠 Estrutura dos principais componentes
Chat: Exibe as mensagens enviadas e recebidas + formulário de envio.

Sidebar: Mostra o perfil do usuário, lista de chats privados e redes sociais da FURIA.

HamburgerMenu: Sidebar para mobile (offcanvas).

PrivateChatList: Lista de chats privados.

useChat, usePrivateChat: Hooks para gerenciar chats públicos e privados.

usePanteraResponse: Hook que faz chamadas para a API de IA (Pantera).

## 💬 Sobre o chatbot "Pantera"
Nome: Pantera

Modelo: OpenAI GPT-3.5-Turbo via OpenRouter.

Descrição: "Você é Pantera, a mascote oficial da FURIA Esports. Responda perguntas relacionadas ao time de Counter-Strike."

## 📸 Layout
Desktop: Sidebar fixa + conteúdo central.

Mobile: Sidebar recolhida em um botão de menu hamburguer.

Visual: Combinação de preto, branco e dourado, seguindo a identidade visual oficial da FURIA.

## 📣 Créditos
Este projeto é parte do Challenge #1: Experiência Conversacional focado em criar uma plataforma de interação para fãs da FURIA.