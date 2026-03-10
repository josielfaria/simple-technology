# 🔀 Level 4 — Controle de Versão com Git

## Objetivo

Dominar versionamento de código e colaboração em equipe

---

## 📌 Slide 1: O que é Controle de Versão?

### Conceito

Sistema que rastreia mudanças em arquivos ao longo do tempo.

**Benefícios:**

- ✅ Histórico completo de alterações
- ✅ Recuperar versões anteriores
- ✅ Trabalho em equipe sem conflitos
- ✅ Rastreabilidade de quem fez o quê

**Analogia:** Como um "time machine" para seu código!

---

## 📌 Slide 2: Git vs GitHub

### Git

- ⚙️ Sistema de controle de versão (software local)
- Funciona no seu computador
- Gerencia commits, branches, histórico

### GitHub

- ☁️ Plataforma na nuvem
- Hospeda repositórios Git
- Facilita colaboração remota

**Fluxo:** Git (local) → GitHub (servidor)

---

## 📌 Slide 3: Conceitos Fundamentais

### Repository (Repositório)

Pasta que contém todo o histórico do projeto

### Commit

"Fotografia" do seu código em um momento específico

- Cada commit tem uma mensagem descritiva
- Rastreável e reversível

### Branch (Ramo)

Linha de desenvolvimento independente

- `main`: versão em produção
- `develop`: versão em desenvolvimento
- `feature/*`: novas funcionalidades

**Visualização:**

```
main    ●──────●──────●
         \     /
develop   ●───●──●
           \ /
feature/x   ●
```

---

## 📌 Slide 4: Configuração Inicial

### Instalar Git

Baixe em: https://git-scm.com

### Configurar identidade

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

### Verificar configuração

```bash
git config --list
```

---

## 📌 Slide 5: Comandos Básicos (Parte 1)

### Inicializar repositório

```bash
git init
```

Cria pasta `.git` no projeto

### Ver status

```bash
git status
```

Mostra arquivos modificados, adicionados ou não rastreados

### Estaging (preparar para commit)

```bash
git add .              # Adiciona todos os arquivos
git add arquivo.js     # Adiciona arquivo específico
```

---

## 📌 Slide 6: Comandos Básicos (Parte 2)

### Criar commit

```bash
git commit -m "mensagem descritiva"
```

**Exemplo prático:**

```bash
git add .
git commit -m "feat: cria função de cálculo de média"
```

### Ver histórico

```bash
git log                    # Histórico completo
git log --oneline         # Versão resumida
git log --graph --oneline # Visualiza branches
```

---

## 📌 Slide 7: Commits Semânticos

### Pattern Padrão

```
<tipo>: <descrição concisa>
```

### Tipos Principais

| Tipo         | Descrição           | Exemplo                           |
| ------------ | ------------------- | --------------------------------- |
| **feat**     | Nova funcionalidade | `feat: adiciona login`            |
| **fix**      | Correção de bug     | `fix: corrige validação de email` |
| **style**    | Formatação/estilo   | `style: formata código`           |
| **docs**     | Documentação        | `docs: adiciona README`           |
| **refactor** | Reorganização       | `refactor: simplifica função`     |

### ✅ Boas práticas

- Use imperativo: "adiciona" (não "adicionado")
- Seja descritivo mas conciso
- Uma mudança lógica por commit

---

## 📌 Slide 8: Trabalhando com Branches

### Criar e mudar de branch

```bash
git checkout -b feature/login
# equivalente a:
git switch -c feature/login
```

### Listar branches

```bash
git branch              # Locais
git branch -a          # Todos (incluindo remotos)
```

### Mudar de branch

```bash
git checkout develop
# ou
git switch develop
```

### Deletar branch

```bash
git branch -d feature/login
```

---

## 📌 Slide 9: Fluxo Git Flow Prático

### 1️⃣ Criar feature

```bash
git checkout develop
git checkout -b feature/cadastro-usuario
```

### 2️⃣ Fazer alterações e commits

```bash
# Edita arquivos...
git add .
git commit -m "feat: cria formulário de cadastro"
git commit -m "feat: adiciona validação de CPF"
```

### 3️⃣ Enviar para GitHub

```bash
git push -u origin feature/cadastro-usuario
```

### 4️⃣ Criar Pull Request no GitHub

- Comparar: `feature/cadastro-usuario` → `develop`
- Descrição e code review

### 5️⃣ Merge

```bash
git checkout develop
git merge feature/cadastro-usuario
git push
```

---

## 📌 Slide 10: Push e Pull

### Push (enviar para servidor)

```bash
git push                      # Branch atual
git push origin feature/x     # Branch específico
git push -u origin feature/x  # Com tracking
```

### Pull (trazer do servidor)

```bash
git pull                 # Atualiza branch atual
git pull origin develop  # De origem específica
```

### Clone (primeiro download)

```bash
git clone https://github.com/usuario/projeto.git
```

---

## 📌 Slide 11: .gitignore

### Arquivo para ignorar arquivos

```
# filepath: .gitignore

# Node.js
node_modules/
npm-debug.log
.env

# IDEs
.vscode/
.idea/

# Sistema
.DS_Store
Thumbs.db

# Arquivos sensíveis
*.log
secrets.json
```

### Resultado

Arquivos listados **NÃO** vão para repositório!

---

## 📌 Slide 12: Caso Prático Completo

### Cenário: Projeto "Lista de Tarefas"

```bash
# 1. Criar repositório local
mkdir lista-tarefas
cd lista-tarefas
git init

# 2. Criar arquivo inicial
echo "# Lista de Tarefas" > README.md
git add README.md
git commit -m "docs: cria README inicial"

# 3. Criar feature
git checkout -b feature/estrutura-html

# 4. Editar index.html
# (código HTML aqui)

# 5. Commit
git add index.html
git commit -m "feat: cria estrutura HTML da página"

# 6. Publicar no GitHub
git remote add origin https://github.com/usuario/lista-tarefas.git
git branch -M main
git push -u origin main

# 7. Voltar para develop e criar nova feature
git checkout -b feature/estilos-css
# (edita CSS)
git add styles.css
git commit -m "style: adiciona estilos da página"
git push -u origin feature/estilos-css
```

---

## 📌 Slide 13: Resolvendo Conflitos

### Quando ocorre conflito

Duas pessoas editam a mesma linha

### Arquivo com conflito

```javascript
<<<<<<< HEAD
  console.log("Versão local");
=======
  console.log("Versão remota");
>>>>>>> feature/nova-função
```

### Resolução

1. Escolher qual versão manter
2. Remover marcadores (`<<<<`, `====`, `>>>>`)
3. Fazer commit

```bash
git add arquivo-resolvido.js
git commit -m "fix: resolve conflito de merge"
```

---

## 📌 Slide 14: Dicas Profissionais

### ✅ Faça

- Commits pequenos e focados
- Mensagens claras e semânticas
- Pull antes de push
- Revise código no GitHub (PR)
- Use branches para tudo

### ❌ Evite

- Commits gigantes com muitas mudanças
- Mensagens vagas ("ajustes", "test")
- Push diretamente em main
- Commits com código quebrado

### 📚 Recursos

- `git --help` - Ajuda geral
- `git <comando> --help` - Ajuda específica
- Documentação: https://git-scm.com/doc

---

## 🎯 Resumo

| O quê        | Comando                     |
| ------------ | --------------------------- |
| Iniciar repo | `git init`                  |
| Ver mudanças | `git status`                |
| Preparar     | `git add .`                 |
| Salvar       | `git commit -m "msg"`       |
| Histórico    | `git log`                   |
| Criar branch | `git checkout -b feature/x` |
| Enviar       | `git push`                  |
| Baixar       | `git pull`                  |
| Mesclar      | `git merge feature/x`       |

---

## 🚀 Próximos Passos

1. Praticar os comandos básicos
2. Criar repositório no GitHub
3. Fazer pull requests em projetos open source
4. Entender workflows da equipe

**Lembre-se:** Git é uma habilidade essencial! Pratique diariamente.
