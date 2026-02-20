# 🎭 Fullstack E2E Testing with Playwright & Docker

Este repositório demonstra uma abordagem **profissional e determinística** para testes End-to-End (E2E) em uma aplicação Full Stack.

O projeto mostra como garantir:

✅ isolamento entre testes
✅ previsibilidade do banco de dados
✅ paridade entre ambiente local e CI
✅ confiabilidade em pipelines automatizados

---

## 🚀 Stack Tecnológica

- **Frontend:** Next.js (App Router)
- **Backend:** Node.js + Express
- **Banco de Dados:** PostgreSQL
- **Testes E2E:** Playwright
- **Infraestrutura:** Docker & Docker Compose
- **Execução TS no Node:** tsx

---

## 🧠 Objetivo do Projeto

Demonstrar boas práticas utilizadas em empresas para:

- validar fluxos reais do usuário
- evitar flaky tests
- garantir consistência de dados
- preparar aplicações para CI/CD

---

## 🛠️ Diferenciais Técnicos

### 🔹 1. Database Reset & Seed Automatizado

Para evitar interferência entre testes:

- O Playwright executa `POST /api/testing/reset` antes de cada teste.
- O backend executa:
  - `TRUNCATE` nas tabelas
  - inserção de dados seed

- Cada teste começa com um estado previsível.

✅ elimina dependência entre testes
✅ garante determinismo
✅ evita falsos positivos/negativos

---

### 🔹 2. Ambiente Orquestrado com Docker

Toda a infraestrutura roda via Docker:

- backend
- frontend
- banco de dados

Isso garante:

✅ ambiente idêntico ao CI
✅ zero configuração manual
✅ onboarding rápido

---

### 🔹 3. Execução TypeScript Nativa no Node

Uso do **tsx** para:

- executar `.ts` diretamente
- evitar build desnecessário
- resolver conflitos ESM
- acelerar inicialização dos containers

---

## 📂 Estrutura do Projeto

```text
.
├── backend/          # API Express + rotas de teste
├── frontend/         # App Next.js
├── e2e/              # Testes Playwright
├── sql/              # Scripts init do banco
└── docker-compose.e2e.yml
```

---

## 🏃 Executando Localmente

### ✅ Pré-requisitos

- Docker Desktop em execução
- Node.js 20+

---

### ▶️ 1. Subir a infraestrutura

Na raiz do projeto:

```bash
docker compose -f docker-compose.e2e.yml up --build
```

Aguarde:

```
🚀 Backend rodando na porta 3001
```

---

### ▶️ 2. Executar os testes E2E

Abra outro terminal:

```bash
cd e2e
npm install
npx playwright test --ui
```

Interface interativa:

```
http://localhost:9323
```

---

## 🧪 Fluxos Testados

### ✅ Listagem inicial (Seed)

Valida se o usuário padrão inserido pelo reset aparece na UI.

---

### ✅ Cadastro e Persistência

Simula o fluxo real do usuário:

1. Preenche formulário
2. Clica em **Adicionar**
3. Valida persistência no banco
4. Confirma renderização na interface

---

## 🔬 Práticas de Qualidade Aplicadas

✔ Reset determinístico do banco
✔ Isolamento entre testes
✔ Ambiente reproduzível via Docker
✔ Testes baseados em comportamento real
✔ Paridade entre ambiente local e CI

---

## 📈 Possíveis Evoluções

- CI/CD com GitHub Actions
- Publicação de relatório Playwright
- Page Object Model
- Test data builders
- Testes visuais (visual regression)
- Observabilidade de testes

---

## 🎯 Quando usar este modelo?

Este setup reflete cenários reais de:

- aplicações fullstack modernas
- times que adotam CI/CD
- pipelines com testes confiáveis
- engenharia de qualidade moderna

---

## 👨‍💻 Autor

Desenvolvido com foco em **Qualidade de Software**, **Full Stack Engineering** e **Boas práticas de automação de testes**.
