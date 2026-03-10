# 📚 Plano de Estudo – Desenvolvedor Fullstack (Angular + Node.js)

## 🧠 Level 1 — Lógica de Programação (2 a 3 semanas)

**Objetivo:** pensar como programador antes de aprender frameworks.

### Conteúdos

- O que é programação
- Variáveis
- Tipos de dados
- Operadores
- Condições (if, else)
- Estruturas de repetição (for, while)
- Funções
- Arrays e objetos
- Algoritmos simples

### Prática

- Calculadora
- Verificar número par ou ímpar
- Média de notas
- Contador
- Lista de tarefas simples

### Ferramentas Recomendadas

- JavaScript no navegador
- VSCode

### Mini Projeto

Sistema simples de lista de tarefas no console

---

## 🌐 Level 2 — Fundamentos da Web (2 semanas)

Antes de Angular, entender como a web funciona.

### Conteúdos

- Como funciona a internet
- HTTP / HTTPS
- Cliente vs Servidor
- API
- JSON
- Navegador e DOM

---

## 🎨 Level 3 — HTML + CSS (2 a 3 semanas)

Construir interfaces.

### HTML

- Estrutura de página
- Tags principais
- Formulários
- Inputs
- Tabelas
- Semântica

### CSS

- Seletores
- Cores
- Fontes
- Box model
- Flexbox
- Grid
- Responsividade

### Projetos

1. Página de perfil pessoal
2. Landing page de um produto

---

## 🔀 Level 4 — Controle de Versão com Git (1 a 2 semanas)

Introduza versionamento e colaboração.

### Fundamentos

- O que é controle de versão
- O que é Git
- O que é GitHub
- Criar repositório

### Comandos Básicos

- `git init`
- `git add`
- `git commit`
- `git push`
- `git clone`
- `git pull`
- `git status`
- `git log`

### Boas Práticas

- `.gitignore`
- Commits semânticos

#### Exemplos de Commits Semânticos

```
feat: adiciona nova funcionalidade
fix: corrige um bug
style: altera estilo ou formatação
docs: atualiza documentação
```

### Git Flow

- `main`
- `develop`
- `feature/nome-da-feature`

#### Fluxo Prático

Criar feature:

```bash
git checkout develop
git checkout -b feature/login
```

Após desenvolvimento:

```bash
git add .
git commit -m "feat: cria tela de login"
git push
```

Merge para develop:

```bash
git checkout develop
git merge feature/login
```

### Prática

Criar um repositório para projetos anteriores ou novo projeto `pagina-perfil-html`:

```bash
git init
git add .
git commit -m "primeira versão da página"
git push
```

---

## ⚡ Level 5 — JavaScript para Web (3 a 4 semanas)

Programação no front-end.

### Conteúdos

- DOM
- Eventos
- Manipulação de elementos
- Fetch API
- Promises
- Async/await
- Modules
- localStorage

### Projetos

1. Lista de tarefas com interface
2. Calculadora web
3. Consumir API pública (clima, pokémons)

---

## 🅰️ Level 6 — Angular (4 a 6 semanas)

Framework principal do front-end.

### Conceitos Básicos

- O que é SPA
- Angular CLI
- Estrutura do projeto

### Componentes

- Criação
- Template
- Binding
- Eventos

### Diretivas

- ngIf
- ngFor
- ngClass

### Services

- Injeção de dependência

### Rotas

- Router
- Navegação

### HTTP

- Consumir API
- HttpClient

### Forms

- Template forms
- Reactive forms

### Projeto Angular

Sistema de tarefas (CRUD) com:

- Login fake
- Cadastro
- Edição
- Exclusão
- Persistência em API

---

## 🟢 Level 7 — Node.js + Express (3 a 4 semanas)

Desenvolvimento backend.

### Conteúdos

- Node.js
- npm
- Express (rotas, controllers, middlewares)
- REST API

### Banco de Dados

- MongoDB ou PostgreSQL
- CRUD
- Conexão com Node
- Models

### Fluxo Profissional

- Pull Request
- Code Review
- Merge
- Rebase (opcional)
- Resolver conflitos

#### Fluxo com GitHub

```
feature → pull request → develop → main
```

### Projeto Backend

API para Sistema de Tarefas:

- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

---

## 🔗 Level 8 — Integração Fullstack (2 semanas)

Conectar Angular → API Node.

### Conteúdos

- CORS
- Autenticação JWT
- Interceptors Angular
- Guardar token

---

## 🚀 Level 9 — Projeto Final (2 a 3 semanas)

Projeto completo fullstack.

### Exemplo: Sistema Financeiro Simples

- Login
- Cadastro de receitas
- Cadastro de despesas
- Dashboard
- Gráficos
- Filtro por mês

### Stack

- Angular
- Node + Express
- Banco de dados

---

## 🧰 Ferramentas Essenciais

- VSCode
- Git
- GitHub
- Postman / Insomnia
- Docker (depois)
- CI/CD (depois)
- Deploy (depois)

---

## 📅 Cronograma Estimado

- **2h por dia**
- **5 dias por semana**
- **Tempo total:** 4 a 6 meses

