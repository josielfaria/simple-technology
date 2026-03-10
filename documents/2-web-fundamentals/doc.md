# 🌐 Level 2 — Fundamentos da Web

## O que você vai aprender

Entender como a internet funciona antes de aprender frameworks é essencial para ser um desenvolvedor fullstack competente.

---

## 📡 Como Funciona a Internet

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │         │  Servidor   │
│ (Browser)   │ ────→ ← │  (Node.js)  │
└─────────────┘         └─────────────┘
```

**Fluxo:**

1. Você digita uma URL no navegador
2. Seu computador (cliente) envia uma requisição
3. O servidor processa e responde
4. O navegador exibe o resultado

---

## 🔐 HTTP vs HTTPS

| HTTP                | HTTPS               |
| ------------------- | ------------------- |
| Sem criptografia ❌ | Com criptografia ✅ |
| Inseguro            | Seguro              |
| Port 80             | Port 443            |

**Exemplo prático:** Usar HTTPS em formulários de login para proteger senhas.

---

## 👤 Cliente vs Servidor

### Cliente

- Seu navegador (Firefox, Chrome, etc)
- Roda JavaScript, HTML, CSS
- Exemplo: `http://google.com`

### Servidor

- Computador distante rodando Node.js
- Processa dados, acessa banco de dados
- Exemplo: `api.github.com`

---

## 🔌 O que é API

**API = Interface de Programação de Aplicações**

Permite que aplicações diferentes se comuniquem.

```
Frontend (Angular) ──→ API (Node.js) ──→ Banco de Dados
```

**Exemplo real:**

- App do Spotify precisa enviar usuário à API
- API retorna lista de músicas em JSON

---

## 📄 JSON — O Formato da Web

**JSON = JavaScript Object Notation**

Formato padrão para trocar dados entre cliente e servidor.

```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@email.com",
  "tarefas": [
    {
      "titulo": "Estudar Angular",
      "concluida": false
    }
  ]
}
```

---

## 🌳 DOM — Estrutura da Página

**DOM = Document Object Model**

É a árvore de elementos HTML que o navegador cria.

```
┌─ Document
   ├─ html
   │  ├─ head
   │  │  └─ title
   │  └─ body
   │     ├─ h1
   │     ├─ p
   │     └─ button
```

JavaScript manipula o DOM para criar páginas interativas.

---

## 🎯 Resumo

✅ Internet: Cliente envia requisição, servidor responde  
✅ HTTP/HTTPS: Protocolos de comunicação  
✅ API: Sistema que permite aplicações conversar  
✅ JSON: Linguagem padrão de troca de dados  
✅ DOM: Como o navegador organiza elementos HTML

**Próximo passo:** Level 3 — HTML + CSS para construir interfaces! 🎨
