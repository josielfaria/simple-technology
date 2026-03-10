# 🎨 Level 3 — HTML + CSS

## Objetivo

Construir interfaces web responsivas e semânticas

---

## 📌 Slide 1: O que é HTML?

### HTML (HyperText Markup Language)

Linguagem de marcação que estrutura o conteúdo web.

### Função

Define **ESTRUTURA** e **SEMÂNTICA** da página

### Analogia

HTML é o esqueleto de um edifício:

- Tags = estrutura
- Conteúdo = informação

```html
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1>Olá Mundo!</h1>
  </body>
</html>
```

### O que NÃO é HTML?

❌ HTML não faz design (isso é CSS)
❌ HTML não faz comportamento (isso é JavaScript)

---

## 📌 Slide 2: Estrutura Básica de uma Página

### Template Inicial

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha Página</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Bem-vindo!</h1>
    <p>Conteúdo aqui</p>
  </body>
</html>
```

### Partes Principais

| Elemento          | Função                         |
| ----------------- | ------------------------------ |
| `<!DOCTYPE html>` | Declara versão HTML5           |
| `<html>`          | Contêiner raiz                 |
| `<head>`          | Metadados (título, links, etc) |
| `<body>`          | Conteúdo visível               |

---

## 📌 Slide 3: Tags Principais (Texto)

### Títulos

```html
<h1>Título Principal</h1>
<!-- Mais importante -->
<h2>Subtítulo</h2>
<h3>Sub-subtítulo</h3>
<!-- ... até h6 -->
```

### Parágrafos e Textos

```html
<p>Parágrafo normal</p>

<strong>Texto em negrito</strong>
<em>Texto em itálico</em>

<br />
<!-- Quebra de linha -->
<hr />
<!-- Linha horizontal -->
```

### Listas

```html
<!-- Lista sem ordem -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Lista ordenada -->
<ol>
  <li>Primeiro</li>
  <li>Segundo</li>
</ol>
```

---

## 📌 Slide 4: Links e Imagens

### Links

```html
<!-- Link externo -->
<a href="https://google.com" target="_blank"> Ir para Google </a>

<!-- Link relativo -->
<a href="pages/sobre.html">Sobre</a>

<!-- Link para email -->
<a href="mailto:contato@email.com">Envie email</a>

<!-- Link com âncora -->
<a href="#secao-2">Ir para seção 2</a>
```

### Imagens

```html
<!-- Imagem com URL -->
<img src="imagem.jpg" alt="Descrição" />

<!-- Imagem responsiva -->
<img src="imagem.jpg" alt="Descrição" width="300" height="200" />

<!-- Picture (múltiplas resoluções) -->
<picture>
  <source media="(max-width: 600px)" srcset="pequeña.jpg" />
  <img src="grande.jpg" alt="Descrição" />
</picture>
```

---

## 📌 Slide 5: Formulários

### Estrutura

```html
<form action="/enviar" method="POST">
  <!-- Text input -->
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" required />

  <!-- Email -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />

  <!-- Password -->
  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha" />

  <!-- Checkbox -->
  <label>
    <input type="checkbox" name="aceita" />
    Aceita termos?
  </label>

  <!-- Radio -->
  <label> <input type="radio" name="genero" value="M" /> Masculino </label>
  <label> <input type="radio" name="genero" value="F" /> Feminino </label>

  <!-- Select -->
  <label for="pais">País:</label>
  <select id="pais" name="pais">
    <option>Brasil</option>
    <option>Portugal</option>
  </select>

  <!-- Textarea -->
  <textarea name="mensagem" rows="5"></textarea>

  <!-- Button -->
  <button type="submit">Enviar</button>
  <button type="reset">Limpar</button>
</form>
```

---

## 📌 Slide 6: Tabelas

### Estrutura Básica

```html
<table border="1">
  <!-- Cabeçalho -->
  <thead>
    <tr>
      <th>Nome</th>
      <th>Idade</th>
      <th>Cidade</th>
    </tr>
  </thead>

  <!-- Corpo -->
  <tbody>
    <tr>
      <td>João</td>
      <td>28</td>
      <td>São Paulo</td>
    </tr>
    <tr>
      <td>Maria</td>
      <td>25</td>
      <td>Rio de Janeiro</td>
    </tr>
  </tbody>

  <!-- Rodapé (opcional) -->
  <tfoot>
    <tr>
      <td colspan="3">Total: 2 pessoas</td>
    </tr>
  </tfoot>
</table>
```

### Atributos Úteis

```html
<td colspan="2">Mescla 2 colunas</td>
<td rowspan="3">Mescla 3 linhas</td>
```

---

## 📌 Slide 7: Semântica HTML5

### Tags Semânticas

Descrevem o significado do conteúdo

```html
<header>
  <!-- Logo, menu principal -->
  <nav>Menu de navegação</nav>
</header>

<main>
  <article>
    <h1>Artigo Principal</h1>
    <p>Conteúdo...</p>
  </article>

  <aside>Barra lateral / Complemento</aside>
</main>

<footer>© 2026 - Todos os direitos reservados</footer>
```

### Benefícios

✅ Melhor SEO
✅ Mais acessibilidade
✅ Código mais legível
✅ Melhor estrutura

---

## 📌 Slide 8: CSS - O que é?

### CSS (Cascading Style Sheets)

Define **ESTILO** e **APARÊNCIA** da página

### Função

- Cores, fontes, tamanhos
- Layout (flexbox, grid)
- Animações
- Responsividade

### Três Formas de Usar CSS

#### 1. Inline (evitar)

```html
<h1 style="color: blue; font-size: 24px;">Título</h1>
```

#### 2. Internal (evitar em produção)

```html
<style>
  h1 {
    color: blue;
  }
</style>
```

#### 3. External (recomendado) ✅

```html
<link rel="stylesheet" href="styles.css" />
```

---

## 📌 Slide 9: Seletores CSS

### Seletores Básicos

```css
/* Elemento */
p {
  color: black;
}

/* Classe (.) */
.titulo {
  font-size: 24px;
}

/* ID (#) */
#principal {
  margin: 0;
}

/* Atributo */
input[type="email"] {
  border: 1px solid blue;
}
```

### Seletores Combinados

```css
/* Filho direto */
div > p {
  color: red;
}

/* Descendente */
div p {
  color: red;
}

/* Múltiplos */
h1,
h2,
h3 {
  font-family: Arial;
}

/* Pseudo-classe */
a:hover {
  color: orange;
}
button:active {
  transform: scale(0.95);
}
```

---

## 📌 Slide 10: Propriedades Essenciais

### Cores e Fonts

```css
body {
  color: #333; /* Cor do texto */
  background-color: #f5f5f5; /* Fundo */
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold; /* 100-900, bold, normal */
  line-height: 1.5; /* Espaçamento entre linhas */
}
```

### Dimensões

```css
.box {
  width: 300px;
  height: 200px;
  max-width: 100%; /* Responsivo */
  padding: 20px; /* Espaço interno */
  margin: 10px; /* Espaço externo */
}
```

### Borders

```css
.card {
  border: 2px solid #ccc;
  border-radius: 8px; /* Cantos arredondados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

---

## 📌 Slide 11: Box Model

### Visualização

```
┌─────────────────────────┐
│      MARGIN             │
│  ┌───────────────────┐  │
│  │    BORDER         │  │
│  │  ┌─────────────┐  │  │
│  │  │  PADDING    │  │  │
│  │  │ ┌─────────┐ │  │  │
│  │  │ │ CONTENT │ │  │  │
│  │  │ └─────────┘ │  │  │
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

### CSS

```css
.box {
  /* margin: topo direita baixo esquerda */
  margin: 10px 20px 30px 40px;

  /* padding: topo direita baixo esquerda */
  padding: 15px;

  border: 2px solid black;
}
```

### Atalhos

```css
margin: 10px; /* Todos os lados */
margin: 10px 20px; /* Vertical Horizontal */
padding: 10px 20px 30px; /* Topo Lateral Baixo */
```

---

## 📌 Slide 12: Flexbox

### Container Flex

```css
.container {
  display: flex;
  justify-content: center; /* Alinhamento horizontal */
  align-items: center; /* Alinhamento vertical */
  gap: 20px; /* Espaço entre itens */
}
```

### Valores de justify-content

```css
justify-content: flex-start; /* Início */
justify-content: center; /* Centro */
justify-content: flex-end; /* Final */
justify-content: space-between; /* Espaço entre */
justify-content: space-around; /* Espaço ao redor */
```

### Exemplo Prático

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  padding: 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}
```

### HTML

```html
<nav class="navbar">
  <div class="logo">Logo</div>
  <div class="links">
    <a href="#home">Home</a>
    <a href="#about">Sobre</a>
    <a href="#contact">Contato</a>
  </div>
</nav>
```

---

## 📌 Slide 13: CSS Grid

### Container Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 colunas iguais */
  gap: 20px;
}
```

### Exemplos de Colunas

```css
/* 3 colunas iguais */
grid-template-columns: 1fr 1fr 1fr;

/* 200px fixa + resto responsivo */
grid-template-columns: 200px 1fr;

/* Auto-fit responsivo */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* Tamanhos diferentes */
grid-template-columns: 2fr 1fr 3fr;
```

### Exemplo Prático

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
}

.gallery img {
  width: 100%;
  border-radius: 8px;
}
```

---

## 📌 Slide 14: Responsividade

### Meta Tag Essencial

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Media Queries

```css
/* Desktop (padrão) */
.container {
  width: 1200px;
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 20px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container {
    width: 100%;
  }

  h1 {
    font-size: 18px;
  }
}
```

### Breakpoints Comuns

```css
/* Extra large */
@media (min-width: 1200px) {
}

/* Large */
@media (max-width: 1199px) {
}

/* Medium (Tablet) */
@media (max-width: 768px) {
}

/* Small (Mobile) */
@media (max-width: 480px) {
}
```

---

## 📌 Slide 15: Projeto Prático - Página de Perfil

### HTML

```html
<!-- filepath: index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Perfil</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="header">
      <nav class="navbar">
        <h1>João Developer</h1>
        <ul>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="sobre" class="hero">
        <img src="foto.jpg" alt="João Developer" class="avatar" />
        <h2>Bem-vindo!</h2>
        <p>Sou développedor fullstack apaixonado por tecnologia</p>
      </section>

      <section id="projetos" class="projetos">
        <h2>Meus Projetos</h2>
        <div class="grid">
          <article class="card">
            <h3>Lista de Tarefas</h3>
            <p>App feito com HTML, CSS e JavaScript</p>
            <a href="#">Ver projeto</a>
          </article>
          <article class="card">
            <h3>Calculadora</h3>
            <p>Calculadora funcional em JavaScript</p>
            <a href="#">Ver projeto</a>
          </article>
          <article class="card">
            <h3>Portfolio</h3>
            <p>Site pessoal responsivo</p>
            <a href="#">Ver projeto</a>
          </article>
        </div>
      </section>

      <section id="contato" class="contato">
        <h2>Entre em Contato</h2>
        <form>
          <input type="text" placeholder="Seu nome" required />
          <input type="email" placeholder="Seu email" required />
          <textarea placeholder="Sua mensagem" rows="5"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 - João Developer. Todos os direitos reservados.</p>
    </footer>
  </body>
</html>
```

### CSS

```css
<!-- filepath: styles.css -->

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Header */
.header {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  position: sticky;
  top: 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

.navbar a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar a:hover {
  color: #3498db;
}

/* Hero */
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid white;
}

.hero h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.hero p {
  font-size: 18px;
  opacity: 0.9;
}

/* Projetos */
.projetos {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.projetos h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.card a {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.card a:hover {
  background: #2980b9;
}

/* Contato */
.contato {
  max-width: 600px;
  margin: 60px auto;
  padding: 0 20px;
  text-align: center;
}

.contato h2 {
  margin-bottom: 30px;
  font-size: 28px;
}

.contato form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contato input,
.contato textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.contato button {
  padding: 12px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.contato button:hover {
  background: #229954;
}

/* Footer */
footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 60px;
}

/* Responsivo */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 15px;
  }

  .navbar ul {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .hero h2 {
    font-size: 24px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 30px 15px;
  }

  .hero h2 {
    font-size: 20px;
  }

  .navbar h1 {
    font-size: 18px;
  }
}
```

---

## 📌 Slide 16: Dicas Profissionais

### ✅ Boas Práticas HTML

- ✅ Use tags semânticas
- ✅ Sempre adicione alt em imagens
- ✅ Estruture com lógica clara
- ✅ Use labels em formulários
- ✅ Valide inputs

### ✅ Boas Práticas CSS

- ✅ Mantenha separado do HTML
- ✅ Use classes e IDs com propósito
- ✅ Mobile-first approach
- ✅ Não abuse de !important
- ✅ Organize comentários

### ❌ O que Evitar

- ❌ Tabelas para layout
- ❌ CSS inline
- ❌ Imagens sem alt
- ❌ Fontes muito pequenas (< 12px)
- ❌ Cores com baixo contraste

### 📚 Ferramentas Úteis

- Chrome DevTools (F12)
- ColorPicker
- Can I Use (caniuse.com)
- Figma (design)

---

## 📌 Slide 17: Resumo - Cheat Sheet

### HTML Tags Principais

```
<html> <head> <body> <header> <nav> <main> <article> <aside> <footer>
<h1-h6> <p> <a> <img> <form> <input> <button> <table> <ul> <ol>
<div> <span> <strong> <em> <br> <hr>
```

### CSS Propriedades Comuns

```
display, width, height, margin, padding, border, color, background
font-size, font-family, font-weight, text-align, line-height
justify-content, align-items, gap, grid-template-columns, flex-direction
```

### Media Query Breakpoints

```
Desktop: > 1200px
Tablet: 768px - 1199px
Mobile: < 767px
```

---

## 🎯 Próximos Passos

1. ✅ Praticar cada tag e propriedade CSS
2. ✅ Criar página de perfil pessoal
3. ✅ Fazer landing page de um produto
4. ✅ Aprender ferramentas de design
5. ✅ Estudar acessibilidade (A11y)

### 🚀 Lembre-se

- **HTML** = Estrutura
- **CSS** = Estilo
- **JavaScript** = Interação

Domine o básico antes de aprender frameworks!

---

## 📞 Recursos Úteis

- MDN Web Docs: https://developer.mozilla.org
- W3Schools: https://www.w3schools.com
- CSS-Tricks: https://css-tricks.com
- Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid/
