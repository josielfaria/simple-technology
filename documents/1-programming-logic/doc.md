# 🧠 Level 1 — Lógica de Programação

## Objetivo

Pensar como programador antes de aprender frameworks.

---

## 📌 O que é Programação?

Programação é dar instruções ao computador de forma estruturada. É como uma receita de bolo: passos claros, na ordem correta.

```javascript
// Exemplo: Instruções simples
console.log("Hello World!");
```

---

## 📦 Variáveis

Espaço na memória para armazenar dados.

```javascript
let nome = "João";
let idade = 25;
let ativo = true;

console.log(nome); // João
```

---

## 🔢 Tipos de Dados

| Tipo    | Exemplo          |
| ------- | ---------------- |
| String  | `"Texto"`        |
| Number  | `42`, `3.14`     |
| Boolean | `true`, `false`  |
| Array   | `[1, 2, 3]`      |
| Object  | `{nome: "João"}` |

---

## ➕ Operadores

```javascript
let a = 10,
  b = 5;

console.log(a + b); // 15 (soma)
console.log(a - b); // 5 (subtração)
console.log(a * b); // 50 (multiplicação)
console.log(a / b); // 2 (divisão)
console.log(a > b); // true (maior que)
```

---

## ❓ Condições (if, else)

```javascript
let numero = 10;

if (numero > 5) {
  console.log("Número é maior que 5");
} else {
  console.log("Número é menor ou igual a 5");
}
```

---

## 🔄 Estruturas de Repetição

**For Loop:**

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

**While Loop:**

```javascript
let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;
}
```

---

## 🎯 Funções

Bloco de código reutilizável.

```javascript
function somar(a, b) {
  return a + b;
}

console.log(somar(5, 3)); // 8
```

---

## 📊 Arrays e Objetos

**Array:**

```javascript
let frutas = ["maçã", "banana", "laranja"];
console.log(frutas[0]); // maçã
```

**Objeto:**

```javascript
let usuario = {
  nome: "Maria",
  idade: 28,
  email: "maria@email.com",
};

console.log(usuario.nome); // Maria
```

---

## 💡 Prática: Verificar Par ou Ímpar

```javascript
function verificarParOuImpar(numero) {
  if (numero % 2 === 0) {
    console.log("Par");
  } else {
    console.log("Ímpar");
  }
}

verificarParOuImpar(4); // Par
verificarParOuImpar(7); // Ímpar
```

---

## 🧮 Prática: Média de Notas

```javascript
function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

console.log(calcularMedia([8, 9, 7])); // 8
```

---

## ✅ Mini Projeto: Lista de Tarefas (Console)

```javascript
let tarefas = [];

function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
  console.log("Tarefa adicionada:", tarefa);
}

function listarTarefas() {
  console.log("Tarefas:", tarefas);
}

adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Fazer exercício");
listarTarefas();
```

---

## 🛠️ Ferramentas Recomendadas

- **JavaScript no navegador** (DevTools - F12)
- **VSCode**
