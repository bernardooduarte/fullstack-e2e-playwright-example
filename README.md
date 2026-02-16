# 🎭 Fullstack E2E Testing with Playwright & Docker

Este repositório apresenta uma implementação profissional de testes End-to-End (E2E) em uma aplicação Full Stack. O foco principal é demonstrar como garantir **determinismo** e **isolamento** em testes que dependem de banco de dados.

## 🚀 Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Backend**: [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/) e [tsx](https://tsx.is/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Testes**: [Playwright](https://playwright.dev/)
- **Infraestrutura**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Diferenciais Técnicos

### 1. API Seeding & Database Reset
Para evitar que um teste interfira no outro, implementamos um endpoint de "Reset" (`/api/testing/reset`).
- Antes de cada teste (`beforeEach`), o Playwright dispara uma requisição POST para o Backend.
- O Backend executa um `TRUNCATE` no Postgres e insere dados iniciais (Seed).
- Isso garante que a aplicação esteja sempre em um estado conhecido antes de cada validação.

### 2. Ambiente Orquestrado com Docker
Toda a infraestrutura (App, API e DB) é gerenciada via Docker Compose, garantindo que o ambiente de teste seja idêntico ao de integração contínua (CI).

### 3. Execução TypeScript Nativa
Utilizamos o `tsx` no ambiente de containers para permitir a execução direta de arquivos `.ts` no Node 20+, resolvendo conflitos de extensões ESM e otimizando o tempo de build.

## 📂 Estrutura do Projeto

```text
.
├── backend/          # API Express com rotas de negócio e teste
├── frontend/         # App Next.js que consome a API
├── e2e/              # Suíte de testes Playwright
├── sql/              # Scripts de inicialização do banco (init.sql)
└── docker-compose.e2e.yml

```

## 🏃 Como Rodar Localmente

### Pré-requisitos

* Docker Desktop instalado e rodando.
* Node.js v20+.

### Passo a Passo

1. **Subir a Infraestrutura:**

   Na raiz do projeto, execute:

   ```bash
   docker compose -f docker-compose.e2e.yml up --build
   ```

   Aguarde a mensagem: `Backend rodando na porta 3001`.

2. **Rodar os Testes:**

   Em um novo terminal, entre na pasta de testes e execute o Playwright:

   ```bash
   cd e2e
   npm install
   npx playwright test --ui
   ```

## 🧪 Fluxos Testados

* **Leitura**: Verifica se o usuário padrão criado pelo Seed aparece na listagem inicial.
* **Escrita & Persistência**: Simula um usuário preenchendo o formulário de cadastro, clica em "Adicionar" e valida se o novo dado foi persistido e renderizado na tela.

---

Desenvolvido com foco em Qualidade de Software e Engenharia Full Stack.

---
