# ⚡ Level 5 — JavaScript para Web

## Objetivo

Programação interativa no front-end com manipulação do DOM

---

## 📌 Slide 1: O que é JavaScript para Web?

### JavaScript (JS)

Linguagem de programação que adiciona **interatividade** às páginas web.

### Função

- Manipular elementos HTML
- Responder a eventos do usuário
- Fazer requisições a servidores
- Armazenar dados localmente
- Criar aplicações dinâmicas

### Analogia

```
HTML  = Estrutura (esqueleto)
CSS   = Aparência (pele)
JS    = Comportamento (músculos e cérebro)
```

### Onde usar JS?

```html
<script src="script.js"></script>
<!-- Externo (recomendado) -->
<script>
  console.log("Inline");
</script>
<!-- Inline (evitar) -->
```

---

## 📌 Slide 2: DOM - Document Object Model

### O que é DOM?

Interface que representa a página HTML como uma árvore de objetos.

### Visualização

```
Document
├── html
│   ├── head
│   │   ├── title
│   │   └── link
│   └── body
│       ├── header
│       │   └── nav
│       ├── main
│       │   ├── h1
│       │   └── p
│       └── footer
```

### Acessar Elementos

```javascript
// Por ID
const elemento = document.getElementById("meu-id");

// Por classe
const elementos = document.getElementsByClassName("minha-classe");

// Por seletor CSS (recomendado)
const um = document.querySelector(".box"); // Primeiro
const varios = document.querySelectorAll(".box"); // Todos

// Por tag
const paragrafos = document.getElementsByTagName("p");
```

### Exemplo HTML

```html
<div id="container" class="box">
  <h1>Título</h1>
  <p class="texto">Parágrafo</p>
</div>
```

```javascript
// Acessar
const container = document.querySelector("#container");
const texto = document.querySelector(".texto");
const h1 = document.querySelector("h1");
```

---

## 📌 Slide 3: Manipular Conteúdo

### Ler e Modificar Texto

```javascript
const title = document.querySelector("h1");

// Ler conteúdo
console.log(title.textContent);

// Modificar conteúdo
title.textContent = "Novo Título";
title.innerHTML = "<em>Título em itálico</em>";
```

### Diferença textContent vs innerHTML

```javascript
const div = document.querySelector("div");

// textContent = apenas texto
div.textContent = "<strong>Texto</strong>";
// Resultado: <strong>Texto</strong> (como texto)

// innerHTML = interpreta HTML
div.innerHTML = "<strong>Texto</strong>";
// Resultado: Texto em negrito
```

### Manipular Atributos

```javascript
const img = document.querySelector("img");

// Ler atributo
console.log(img.getAttribute("alt"));

// Definir atributo
img.setAttribute("alt", "Nova descrição");

// Remover atributo
img.removeAttribute("alt");

// Propriedades diretas
img.src = "nova-imagem.jpg";
img.alt = "Descrição";
a.href = "https://novo-link.com";
```

### Manipular Classes

```javascript
const box = document.querySelector(".box");

// Adicionar classe
box.classList.add("active");

// Remover classe
box.classList.remove("active");

// Toggle (adiciona se não tem, remove se tem)
box.classList.toggle("active");

// Verificar se tem classe
if (box.classList.contains("active")) {
  console.log("Tem a classe active");
}

// Múltiplas classes
box.classList.add("active", "visible");
```

### Manipular Estilos

```javascript
const element = document.querySelector(".box");

// Estilo inline
element.style.color = "red";
element.style.backgroundColor = "#f0f0f0";
element.style.fontSize = "20px";

// Múltiplos estilos
Object.assign(element.style, {
  color: "blue",
  marginTop: "20px",
  borderRadius: "8px",
});
```

---

## 📌 Slide 4: Eventos

### O que são Eventos?

Ações do usuário que disparam código JS:

- Click, double-click
- Hover (mouse over/out)
- Submit, change
- Scroll, resize
- Typed (keydown, keyup)

### Adicionar Listeners

```javascript
const button = document.querySelector("button");

// Forma moderna (recomendado)
button.addEventListener("click", function () {
  console.log("Botão clicado!");
});

// Com arrow function
button.addEventListener("click", () => {
  console.log("Botão clicado!");
});

// Forma antiga (evitar)
button.onclick = function () {
  console.log("Botão clicado!");
};
```

### Eventos Comuns

```javascript
// Click
element.addEventListener("click", () => {});

// Double-click
element.addEventListener("dblclick", () => {});

// Mouse
element.addEventListener("mouseenter", () => {});
element.addEventListener("mouseleave", () => {});

// Formulário
input.addEventListener("change", () => {});
input.addEventListener("input", () => {});
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Impede envio padrão
});

// Teclado
document.addEventListener("keydown", (event) => {
  console.log(event.key); // Qual tecla foi pressionada
});

// Scroll
window.addEventListener("scroll", () => {
  console.log("Página scrolled");
});

// Resize
window.addEventListener("resize", () => {
  console.log("Janela redimensionada");
});
```

### Event Object

```javascript
button.addEventListener("click", (event) => {
  console.log(event.type); // 'click'
  console.log(event.target); // Elemento clicado
  console.log(event.key); // Qual tecla (em keydown)
  console.log(event.clientX); // Posição X do mouse
  console.log(event.clientY); // Posição Y do mouse
});

// Remover listener
const handleClick = () => console.log("Clicado!");
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

---

## 📌 Slide 5: Projeto 1 - Lista de Tarefas

### HTML

```html
<!-- filepath: index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lista de Tarefas</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>📝 Minhas Tarefas</h1>

      <div class="input-wrapper">
        <input type="text" id="taskInput" placeholder="Digite uma tarefa..." />
        <button id="addBtn">Adicionar</button>
      </div>

      <ul id="taskList" class="task-list">
        <!-- Tarefas aparecem aqui -->
      </ul>
    </div>

    <script src="script.js"></script>
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
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#taskInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

#taskInput:focus {
  outline: none;
  border-color: #667eea;
}

#addBtn {
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

#addBtn:hover {
  background: #5568d3;
}

.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: all 0.3s;
}

.task-item:hover {
  background: #e8e8e8;
  transform: translateX(5px);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #999;
}

.task-text {
  flex: 1;
  cursor: pointer;
}

.task-delete {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s;
}

.task-delete:hover {
  background: #c0392b;
}
```

### JavaScript

```javascript
<!-- filepath: script.js -->
const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');

// Adicionar tarefa ao clicar no botão
addBtn.addEventListener('click', addTask);

// Adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  // Validar
  if (taskText === '') {
    alert('Digite uma tarefa!');
    return;
  }

  // Criar elemento
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="task-delete">Deletar</button>
  `;

  // Adicionar à lista
  taskList.appendChild(li);

  // Limpar input
  taskInput.value = '';
  taskInput.focus();

  // Marcar como concluído ao clicar
  li.querySelector('.task-text').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Deletar ao clicar
  li.querySelector('.task-delete').addEventListener('click', () => {
    li.remove();
  });
}
```

---

## 📌 Slide 6: Promises

### O que são Promises?

Objeto que representa uma operação **assíncrona** que pode ter 3 estados:

1. **Pending** - Em andamento
2. **Resolved** - Sucesso
3. **Rejected** - Erro

### Criar Promise

```javascript
const minhaPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const sucesso = true;

    if (sucesso) {
      resolve("Operação concluída com sucesso!");
    } else {
      reject("Erro na operação!");
    }
  }, 2000);
});

// Usar .then() e .catch()
minhaPromise
  .then((resultado) => {
    console.log(resultado); // Sucesso
  })
  .catch((erro) => {
    console.log(erro); // Erro
  });
```

### Exemplo Prático

```javascript
function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dados = {
        name: "João",
        age: 28,
      };
      resolve(dados);
    }, 1000);
  });
}

buscarDados()
  .then((dados) => {
    console.log("Dados:", dados);
    // Fazer algo com os dados
  })
  .catch((erro) => {
    console.log("Erro:", erro);
  });
```

### Promise.all()

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("foo"), 100),
);
const promise3 = fetch("https://api.example.com/data");

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("Todas as promises resolvidas!");
    console.log(results);
  })
  .catch((error) => {
    console.log("Uma promise foi rejeitada:", error);
  });
```

---

## 📌 Slide 7: Async/Await

### O que é Async/Await?

Forma moderna de trabalhar com **promises** de forma mais legível.

### Async Function

```javascript
async function buscarDados() {
  // Essa função sempre retorna uma Promise
  return "Dados obtidos";
}

buscarDados().then((resultado) => {
  console.log(resultado); // 'Dados obtidos'
});
```

### Await

```javascript
async function buscarUsuario() {
  try {
    const response = await fetch("https://api.github.com/users/octocat");
    const usuario = await response.json();
    console.log(usuario);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

buscarUsuario();
```

### Comparação

```javascript
// Com Promises (antigo)
function buscar() {
  return fetch("url")
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((erro) => console.log(erro));
}

// Com Async/Await (moderno)
async function buscar() {
  try {
    const resp = await fetch("url");
    const data = await resp.json();
    console.log(data);
  } catch (erro) {
    console.log(erro);
  }
}
```

---

## 📌 Slide 8: Fetch API

### O que é Fetch?

API para fazer requisições HTTP (buscar dados de servidores).

### GET Request

```javascript
// Simples
fetch("https://api.github.com/users/octocat")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// Com Async/Await
async function getUser() {
  try {
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

### POST Request

```javascript
async function enviarDados() {
  try {
    const response = await fetch("https://api.example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "João",
        email: "joao@example.com",
      }),
    });

    const resultado = await response.json();
    console.log(resultado);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}
```

### Verificar Status

```javascript
async function buscar() {
  try {
    const response = await fetch("url");

    // Verificar se foi bem-sucedido
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}
```

---

## 📌 Slide 9: Projeto 2 - Consumir API (Pokémon)

### HTML

```html
<!-- filepath: pokemon.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokédex</title>
    <link rel="stylesheet" href="pokemon.css" />
  </head>
  <body>
    <div class="container">
      <h1>🔴 Pokédex</h1>

      <input
        type="text"
        id="searchInput"
        placeholder="Digite o nome do Pokémon..."
        class="search-input"
      />

      <div id="pokemon" class="pokemon-card">
        <!-- Pokémon apareça aqui -->
      </div>

      <div id="error" class="error">
        <!-- Mensagens de erro aparecem aqui -->
      </div>
    </div>

    <script src="pokemon.js"></script>
  </body>
</html>
```

### CSS

```css
<!-- filepath: pokemon.css -->
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f0f0f0;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  border-color: #ff6b6b;
}

.pokemon-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: none;
}

.pokemon-card.show {
  display: block;
}

.pokemon-card img {
  width: 200px;
  height: 200px;
}

.pokemon-card h2 {
  text-transform: capitalize;
  color: #333;
  margin: 15px 0;
}

.pokemon-card .stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
}

.pokemon-card .stat {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}

.pokemon-card .stat strong {
  display: block;
  color: #666;
  font-size: 12px;
}

.pokemon-card .stat span {
  display: block;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}

.error {
  background: #ff6b6b;
  color: white;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  display: none;
}

.error.show {
  display: block;
}
```

### JavaScript

```javascript
<!-- filepath: pokemon.js -->
const searchInput = document.querySelector('#searchInput');
const pokemonCard = document.querySelector('#pokemon');
const errorDiv = document.querySelector('#error');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query === '') {
    pokemonCard.classList.remove('show');
    errorDiv.classList.remove('show');
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error('Pokémon não encontrado!');
    }

    const pokemon = await response.json();

    // Mostrar card
    pokemonCard.innerHTML = `
      <img src="${pokemon.sprites.other['official-artwork'].front_default}"
           alt="${pokemon.name}">
      <h2>#${pokemon.id} - ${pokemon.name}</h2>

      <div class="stats">
        <div class="stat">
          <strong>Altura</strong>
          <span>${(pokemon.height / 10).toFixed(1)}m</span>
        </div>
        <div class="stat">
          <strong>Peso</strong>
          <span>${(pokemon.weight / 10).toFixed(1)}kg</span>
        </div>
        <div class="stat">
          <strong>Tipo</strong>
          <span>${pokemon.types.map(t => t.type.name).join(', ')}</span>
        </div>
        <div class="stat">
          <strong>Habilidades</strong>
          <span>${pokemon.abilities.map(a => a.ability.name).join(', ')}</span>
        </div>
      </div>
    `;

    pokemonCard.classList.add('show');
    errorDiv.classList.remove('show');

  } catch (erro) {
    errorDiv.textContent = erro.message;
    errorDiv.classList.add('show');
    pokemonCard.classList.remove('show');
  }
});
```

---

## 📌 Slide 10: LocalStorage

### O que é LocalStorage?

Armazenamento de dados no **navegador** (não no servidor).

### Características

- Persiste mesmo fechando o navegador
- Máximo ~5MB por site
- Apenas strings (precisa JSON para objetos)
- Acessível apenas via JavaScript

### Operações Básicas

```javascript
// Salvar
localStorage.setItem("nome", "João");
localStorage.setItem("age", JSON.stringify(28));

// Recuperar
const nome = localStorage.getItem("nome");
const age = JSON.parse(localStorage.getItem("age"));

// Remover
localStorage.removeItem("nome");

// Limpar tudo
localStorage.clear();

// Verificar se existe
if (localStorage.getItem("tema")) {
  console.log("Tema salvo");
}
```

### Exemplo Prático - Tema Escuro

```javascript
const toggleButton = document.querySelector("#themeToggle");
const body = document.body;

// Carregar tema salvo ao iniciar
const temaSalvo = localStorage.getItem("tema") || "light";
body.classList.add(temaSalvo);

// Toggle tema
toggleButton.addEventListener("click", () => {
  const temaAtual = localStorage.getItem("tema") || "light";
  const novoTema = temaAtual === "light" ? "dark" : "light";

  body.classList.remove(temaAtual);
  body.classList.add(novoTema);

  localStorage.setItem("tema", novoTema);
});
```

### Salvar Objeto

```javascript
// Salvar objeto
const usuario = {
  name: "João",
  email: "joao@email.com",
  age: 28,
};

localStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperar objeto
const usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
console.log(usuarioRecuperado.name); // 'João'
```

---

## 📌 Slide 11: Modules (Import/Export)

### O que são Modules?

Forma de dividir código em arquivos separados e reutilizáveis.

### Export/Import Padrão

```javascript
<!-- filepath: math.js -->
export function somar(a, b) {
  return a + b;
}

export function subtrair(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

```javascript
<!-- filepath: main.js -->
import { somar, subtrair, PI } from './math.js';

console.log(somar(5, 3));      // 8
console.log(subtrair(10, 3));  // 7
console.log(PI);                // 3.14159
```

### Default Export

```javascript
<!-- filepath: utils.js -->
export default function calcularMedia(notas) {
  const soma = notas.reduce((a, b) => a + b, 0);
  return soma / notas.length;
}

export function formatarData(data) {
  return data.toLocaleDateString('pt-BR');
}
```

```javascript
<!-- filepath: app.js -->
import calcularMedia, { formatarData } from './utils.js';

const notas = [7, 8, 9];
console.log(calcularMedia(notas)); // 8

const hoje = new Date();
console.log(formatarData(hoje));   // 10/03/2026
```

### Import no HTML

```html
<script type="module" src="main.js"></script>
```

---

## 📌 Slide 12: Projeto 3 - Calculadora Web

### HTML

```html
<!-- filepath: calc.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculadora</title>
    <link rel="stylesheet" href="calc.css" />
  </head>
  <body>
    <div class="calculator">
      <input type="text" id="display" class="display" readonly value="0" />

      <div class="buttons">
        <button class="btn clear" onclick="clearDisplay()">C</button>
        <button class="btn operator" onclick="appendOperator('/')">/</button>
        <button class="btn operator" onclick="appendOperator('*')">×</button>
        <button class="btn operator" onclick="deleteLast()">⌫</button>

        <button class="btn" onclick="appendNumber('7')">7</button>
        <button class="btn" onclick="appendNumber('8')">8</button>
        <button class="btn" onclick="appendNumber('9')">9</button>
        <button class="btn operator" onclick="appendOperator('-')">-</button>

        <button class="btn" onclick="appendNumber('4')">4</button>
        <button class="btn" onclick="appendNumber('5')">5</button>
        <button class="btn" onclick="appendNumber('6')">6</button>
        <button class="btn operator" onclick="appendOperator('+')">+</button>

        <button class="btn" onclick="appendNumber('1')">1</button>
        <button class="btn" onclick="appendNumber('2')">2</button>
        <button class="btn" onclick="appendNumber('3')">3</button>
        <button class="btn operator" onclick="toggleSign()">±</button>

        <button class="btn" onclick="appendNumber('0')">0</button>
        <button class="btn" onclick="appendNumber('.')">.</button>
        <button class="btn equals" onclick="calculate()">=</button>
      </div>
    </div>

    <script src="calc.js"></script>
  </body>
</html>
```

### CSS

```css
<!-- filepath: calc.css -->
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: Arial, sans-serif;
}

.calculator {
  background: #333;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 320px;
}

.display {
  width: 100%;
  padding: 20px;
  font-size: 32px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  text-align: right;
  margin-bottom: 20px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 20px;
  font-size: 20px;
  background: #555;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.btn:hover {
  background: #666;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

.btn.operator {
  background: #ff9500;
  font-size: 24px;
}

.btn.operator:hover {
  background: #ffb143;
}

.btn.equals {
  background: #4caf50;
  grid-column: span 2;
}

.btn.equals:hover {
  background: #66bb6a;
}

.btn.clear {
  background: #f44336;
  grid-column: span 2;
}

.btn.clear:hover {
  background: #ef5350;
}
```

### JavaScript

```javascript
<!-- filepath: calc.js -->
let display = document.querySelector('#display');
let currentValue = '0';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentValue;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    if (num === '.' && currentValue.includes('.')) return;
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || !previousValue) return;

  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = '';
  previousValue = '';
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentValue = '0';
  previousValue = '';
  operator = '';
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  updateDisplay();
}

function toggleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay();
}
```

---

## 📌 Slide 13: Debugging

### Console Methods

```javascript
// Log normal
console.log("Valor:", valor);

// Aviso
console.warn("Cuidado:", mensagem);

// Erro
console.error("Erro:", erro);

// Tabela
console.table(arrayOuObjeto);

// Timer
console.time("label");
// ... código
console.timeEnd("label");

// Grupo
console.group("Dados");
console.log("Item 1");
console.log("Item 2");
console.groupEnd();
```

### DevTools (F12)

- **Console** - Ver logs e erros
- **Elements** - Inspecionar HTML
- **Sources** - Debugar JavaScript
- **Network** - Ver requisições
- **Performance** - Medir velocidade

### Breakpoints

```javascript
// Pausa a execução
debugger;

// Continua normalmente
```

---

## 📌 Slide 14: Resumo e Reminders

### Principais Conceitos

```
DOM       → Manipular elementos HTML
Eventos   → Responder a ações do usuário
Promises  → Operações assíncronas
Async/Await → Sintaxe moderna para promises
Fetch API   → Buscar dados de servidores
LocalStorage → Armazenar dados local
Modules → Organizar código em arquivos
```

### ✅ Boas Práticas

- ✅ Separar HTML, CSS e JS
- ✅ Usar const/let (não var)
- ✅ Nomes descritivos para variáveis
- ✅ Comentar código complexo
- ✅ Tratar erros com try/catch
- ✅ Usar event listeners (não onclick inline)
- ✅ Validar inputs

### ❌ O que Evitar

- ❌ JavaScript inline em HTML
- ❌ Variáveis globais
- ❌ Esquecer await/then
- ❌ Not checking if response.ok
- ❌ Não limpar listeners
- ❌ Esquecer JSON.parse/stringify

---

## 📌 Slide 15: Próximos Passos

### 1️⃣ Praticar

- ✅ Manipular DOM
- ✅ Responder a eventos
- ✅ Fazer requisições com Fetch
- ✅ Usar LocalStorage

### 2️⃣ Projetos Practice

1. Lista de tarefas (concluído)
2. Consumir API (concluído)
3. Calculadora (concluído)
4. Todo App com localStorage
5. Conversor de moedas
6. Jogo da velha
7. Quiz interativo

### 3️⃣ Aprender Framework

- **Next:** Angular ou React
- **Por quê?** Facilita build de aplicações complexas

### 📚 Recursos

- MDN Web Docs: https://developer.mozilla.org
- JavaScript.info: https://javascript.info
- FreeCodeCamp: https://www.freecodecamp.org

---

## 🎯 Resumo Final

**Level 5 cobre:**

- ✅ DOM manipulation
- ✅ Event handling
- ✅ Asynchronous JavaScript (Promises, Async/Await)
- ✅ Fetch API
- ✅ LocalStorage
- ✅ Modules
- ✅ 3 projetos práticos completos

**Objetivo alcançado:** Você consegue criar **aplicações web interativas**! 🚀

---

## 💡 Dica Final

JavaScript é uma linguagem poderosa e versátil. Quanto mais você praticar, mais confortável ficará. Não se preocupe em memorizar tudo - estude, pratique e consulte a documentação conforme necessário!

**Bom aprendizado!** 📚✨
