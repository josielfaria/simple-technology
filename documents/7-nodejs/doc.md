# 🟢 Level 7 — Node.js + Express

## Objetivo

Dominar desenvolvimento backend com Node.js e Express para construir APIs REST escaláveis

---

## 📌 Slide 1: O que é Node.js?

### Node.js

Runtime JavaScript que executa **fora do navegador** (no servidor).

### Características

- ✅ **JavaScript no backend** - Mesma linguagem front e back
- ✅ **Event-driven** - Baseado em eventos
- ✅ **Non-blocking I/O** - Assíncrono por padrão
- ✅ **NPM** - Maior gerenciador de pacotes
- ✅ **Rápido** - V8 engine (Google)
- ✅ **Escalável** - Para aplicações grandes

### Casos de Uso

- APIs REST
- Real-time (WebSockets)
- Microserviços
- CLI tools
- Back-end de SPAs

### Node vs Outras Linguagens

| Aspecto     | Node.js      | Python      | Java         |
| ----------- | ------------ | ----------- | ------------ |
| Linguagem   | JavaScript   | Python      | Java         |
| Velocidade  | Muito rápido | Rápido      | Muito rápido |
| Curva       | Fácil        | Muito fácil | Difícil      |
| Ecossistema | Gigante      | Grande      | Gigante      |
| I/O         | Non-blocking | Bloqueante  | Bloqueante   |

---

## 📌 Slide 2: Setup Inicial

### Instalar Node.js

Baixe em: https://nodejs.org (versão LTS)

### Verificar Instalação

```bash
node --version    # v18.x.x
npm --version     # 9.x.x
```

### Criar Projeto

```bash
mkdir meu-backend
cd meu-backend
npm init -y
```

### Estrutura Inicial

```
meu-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

### package.json Básico

```json
{
  "name": "meu-backend",
  "version": "1.0.0",
  "description": "API REST com Node e Express",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

## 📌 Slide 3: Express - Framework Web

### O que é Express?

Framework minimalista para criar servidores web e APIs HTTP.

### Instalar Express

```bash
npm install express cors dotenv
npm install --save-dev nodemon
```

### Primeiro Servidor

```javascript
// filepath: src/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota GET
app.get("/", (req, res) => {
  res.json({ mensagem: "Bem-vindo à API!" });
});

// Rota GET com parâmetro
app.get("/usuario/:id", (req, res) => {
  const { id } = req.params;
  res.json({ usuarioId: id });
});

// Rota POST
app.post("/usuario", (req, res) => {
  const { nome, email } = req.body;
  res.status(201).json({
    mensagem: "Usuário criado",
    dados: { nome, email },
  });
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Rodar Servidor

```bash
npm run dev
```

---

## 📌 Slide 4: Rotas e Métodos HTTP

### Métodos HTTP

```javascript
// GET - Buscar dados
app.get("/usuarios", (req, res) => {
  res.json({ usuarios: [] });
});

// POST - Criar dados
app.post("/usuarios", (req, res) => {
  const novoUsuario = req.body;
  res.status(201).json(novoUsuario);
});

// PUT - Atualizar dados (completo)
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  res.json({ mensagem: `Usuário ${id} atualizado`, dados });
});

// PATCH - Atualizar dados (parcial)
app.patch("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  res.json({ mensagem: `Nome do usuário ${id} atualizado para ${nome}` });
});

// DELETE - Deletar dados
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensagem: `Usuário ${id} deletado` });
});
```

### Parâmetros e Queries

```javascript
// Parâmetro de rota: /usuarios/123
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

// Query string: /usuarios?idade=25&cidade=sp
app.get("/usuarios", (req, res) => {
  const { idade, cidade } = req.query;
  res.json({ filtros: { idade, cidade } });
});

// Body (POST/PUT/PATCH)
app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  res.json({ nome, email });
});
```

### Estruturar Rotas

```javascript
// filepath: src/routes/usuarios.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ usuarios: [] });
});

router.post("/", (req, res) => {
  res.status(201).json(req.body);
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
```

```javascript
// filepath: src/server.js
const usuariosRoutes = require("./routes/usuarios");

app.use("/api/usuarios", usuariosRoutes);
// Agora as rotas são: /api/usuarios, /api/usuarios/:id
```

---

## 📌 Slide 5: Middleware

### O que é Middleware?

Função que intercepta requisições e respostas.

### Estrutura

```javascript
(req, res, next) => {
  // Fazer algo
  next(); // Passar para próximo middleware
};
```

### Middlewares Globais

```javascript
// Executar antes de todas as rotas
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static("public"));

// Middleware customizado
app.use((req, res, next) => {
  req.usuario = { id: 1, nome: "João" }; // Agregar dados
  next();
});
```

### Middlewares em Rotas Específicas

```javascript
// Middleware de autenticação
const autenticar = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: "Sem autorização" });
  }

  next();
};

// Usar middleware em rota específica
app.get("/admin", autenticar, (req, res) => {
  res.json({ mensagem: "Painel admin" });
});

// Usar em múltiplas rotas
app.post("/usuarios", autenticar, (req, res) => {
  res.status(201).json(req.body);
});
```

### Middleware de Erro

```javascript
// Deve ser DEPOIS de todas as rotas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    erro: "Erro no servidor",
    mensagem: err.message,
  });
});
```

---

## 📌 Slide 6: Controllers

### O que são Controllers?

Funções que contêm a lógica de negócio das rotas.

### Separar Lógica

```javascript
// filepath: src/controllers/usuarioController.js
const usuarios = [];

exports.listarUsuarios = (req, res) => {
  res.json(usuarios);
};

exports.criarUsuario = (req, res) => {
  const { nome, email } = req.body;

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    dataCriacao: new Date(),
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

exports.buscarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  res.json(usuario);
};

exports.atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuario.nome = nome || usuario.nome;
  usuario.email = email || usuario.email;

  res.json(usuario);
};

exports.deletarUsuario = (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex((u) => u.id == id);

  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário deletado" });
};
```

### Usar Controllers em Rotas

```javascript
// filepath: src/routes/usuarios.js
const express = require("express");
const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.get("/", usuarioController.listarUsuarios);
router.post("/", usuarioController.criarUsuario);
router.get("/:id", usuarioController.buscarUsuario);
router.put("/:id", usuarioController.atualizarUsuario);
router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;
```

---

## 📌 Slide 7: Banco de Dados - MongoDB

### Instalar MongoDB

```bash
# Instalação local: https://www.mongodb.com/try/download/community

# Ou usar MongoDB Atlas (nuvem): https://www.mongodb.com/cloud/atlas
```

### Instalar Driver

```bash
npm install mongodb mongoose
```

### Conectar MongoDB (com Mongoose)

```javascript
// filepath: src/config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/meu-app",
    );
    console.log("MongoDB conectado");
  } catch (erro) {
    console.error("Erro ao conectar MongoDB:", erro);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Criar Model

```javascript
// filepath: src/models/Usuario.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
```

### CRUD com MongoDB

```javascript
// filepath: src/controllers/usuarioController.js
const Usuario = require("../models/Usuario");

// CREATE
exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();

    res.status(201).json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// READ - Todos
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// READ - Um
exports.buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// UPDATE
exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nome, email },
      { new: true, runValidators: true },
    );

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// DELETE
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário deletado" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
```

---

## 📌 Slide 8: Banco de Dados - PostgreSQL

### Instalar PostgreSQL

https://www.postgresql.org/download/

### Instalar Driver

```bash
npm install pg sequelize
```

### Conectar PostgreSQL

```javascript
// filepath: src/config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "meu_app",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "senha",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
);

const conectarBD = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado");
  } catch (erro) {
    console.error("Erro ao conectar PostgreSQL:", erro);
  }
};

module.exports = { sequelize, conectarBD };
```

### Criar Model

```javascript
// filepath: src/models/Usuario.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    dataCriacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

module.exports = Usuario;
```

---

## 📌 Slide 9: Projeto - API de Tarefas (CRUD)

### Estrutura Completa

```
api-tarefas/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Usuario.js
│   │   └── Tarefa.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── tarefaController.js
│   ├── routes/
│   │   ├── usuarios.js
│   │   └── tarefas.js
│   ├── middleware/
│   │   └── autenticacao.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

### package.json

```json
{
  "name": "api-tarefas",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

### .env

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api-tarefas
JWT_SECRET=sua_chave_secreta_super_segura
```

### Modelos

```javascript
// filepath: src/models/Usuario.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
});

// Hash de senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

module.exports = mongoose.model("Usuario", usuarioSchema);
```

```javascript
// filepath: src/models/Tarefa.js
const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  completa: { type: Boolean, default: false },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  dataCriacao: { type: Date, default: Date.now },
  dataAtualizacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tarefa", tarefaSchema);
```

### Controllers

```javascript
// filepath: src/controllers/tarefaController.js
const Tarefa = require("../models/Tarefa");

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ usuarioId: req.usuario.id });
    res.json(tarefas);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const tarefa = new Tarefa({
      titulo,
      descricao,
      usuarioId: req.usuario.id,
    });

    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, completa } = req.body;

    const tarefa = await Tarefa.findByIdAndUpdate(
      id,
      { titulo, descricao, completa, dataAtualizacao: Date.now() },
      { new: true },
    );

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findByIdAndDelete(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Tarefa deletada" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
```

### Rotas

```javascript
// filepath: src/routes/tarefas.js
const express = require("express");
const tarefaController = require("../controllers/tarefaController");
const autenticacao = require("../middleware/autenticacao");

const router = express.Router();

// Todas as rotas precisam de autenticação
router.use(autenticacao);

router.get("/", tarefaController.listarTarefas);
router.post("/", tarefaController.criarTarefa);
router.put("/:id", tarefaController.atualizarTarefa);
router.delete("/:id", tarefaController.deletarTarefa);

module.exports = router;
```

### Server Completo

```javascript
// filepath: src/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuarios");
const tarefasRoutes = require("./routes/tarefas");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((erro) => console.error("Erro MongoDB:", erro));

// Rotas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/tarefas", tarefasRoutes);

// Rota base
app.get("/", (req, res) => {
  res.json({ mensagem: "API de Tarefas v1.0" });
});

// Tratamento 404
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro no servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

---

## 📌 Slide 10: Autenticação e JWT

### O que é JWT?

JSON Web Token - método seguro de autenticação sem sessão.

### Instalar Dependências

```bash
npm install jsonwebtoken bcryptjs
```

### Middleware de Autenticação

```javascript
// filepath: src/middleware/autenticacao.js
const jwt = require("jsonwebtoken");

const autenticacao = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

module.exports = autenticacao;
```

### Controller de Autenticação

```javascript
// filepath: src/controllers/usuarioController.js
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      mensagem: "Login realizado",
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
```

### Rotas de Autenticação

```javascript
// filepath: src/routes/usuarios.js
const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const autenticacao = require("../middleware/autenticacao");

const router = express.Router();

router.post("/registrar", usuarioController.registrar);
router.post("/login", usuarioController.login);

// Rota protegida
router.get("/perfil", autenticacao, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
```

---

## 📌 Slide 11: Validação de Dados

### Instalar Validator

```bash
npm install joi
```

### Validar Requisições

```javascript
// filepath: src/middleware/validacao.js
const Joi = require("joi");

const validarRegistro = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    senha: Joi.string().required().min(6),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      erro: error.details[0].message,
    });
  }

  req.validated = value;
  next();
};

const validarTarefa = (req, res, next) => {
  const schema = Joi.object({
    titulo: Joi.string().required().min(3).max(255),
    descricao: Joi.string().max(1000),
    completa: Joi.boolean(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      erro: error.details[0].message,
    });
  }

  req.validated = value;
  next();
};

module.exports = { validarRegistro, validarTarefa };
```

### Usar Validação em Rotas

```javascript
// filepath: src/routes/usuarios.js
const { validarRegistro } = require("../middleware/validacao");

router.post("/registrar", validarRegistro, usuarioController.registrar);
```

---

## 📌 Slide 12: Variáveis de Ambiente

### .env

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api-tarefas
JWT_SECRET=sua_chave_secreta_bem_segura_123456
CORS_ORIGIN=http://localhost:4200
```

### .env.example (para compartilhar)

```
NODE_ENV=development
PORT=3000
MONGODB_URI=
JWT_SECRET=
CORS_ORIGIN=
```

### .gitignore

```
node_modules/
.env
.DS_Store
dist/
npm-debug.log
```

### Usar Variáveis

```javascript
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

console.log(`Ambiente: ${NODE_ENV}`);
```

---

## 📌 Slide 13: Testes com Insomnia/Postman

### Requisições Comuns

**GET - Listar**

```
GET http://localhost:3000/api/tarefas
Headers: Authorization: Bearer seu_token_aqui
```

**POST - Criar**

```
POST http://localhost:3000/api/tarefas
Headers: Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "titulo": "Aprender Node.js",
  "descricao": "Estudar Express e MongoDB"
}
```

**PUT - Atualizar**

```
PUT http://localhost:3000/api/tarefas/123
Headers: Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "titulo": "Aprender Node.js avançado",
  "completa": true
}
```

**DELETE - Deletar**

```
DELETE http://localhost:3000/api/tarefas/123
Headers: Authorization: Bearer seu_token_aqui
```

---

## 📌 Slide 14: Deployment

### Deploy em Servidor Linux (Ubuntu)

**1. Instalar Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Clonar Repositório**

```bash
git clone seu-repositorio
cd api-tarefas
npm install
```

**3. Instalar PM2**

```bash
sudo npm install -g pm2
```

**4. Iniciar Aplicação**

```bash
pm2 start src/server.js --name "api-tarefas"
pm2 save
pm2 startup
```

**5. Nginx como Reverse Proxy**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

### Deploy em Plataformas

- **Heroku**: `git push heroku main`
- **Railway**: Conectar GitHub
- **Render**: Conectar GitHub
- **Vercel**: Suporte a Node.js
- **AWS**: EC2 + RDS/DynamoDB

---

## 📌 Slide 15: Boas Práticas e Resumo

### ✅ Boas Práticas

- ✅ Separar rotas, controllers, models
- ✅ Usar variáveis de ambiente
- ✅ Validar todas as entradas
- ✅ Implementar autenticação
- ✅ Tratamento de erros robusto
- ✅ Logging de requisições
- ✅ CORS configurado corretamente
- ✅ Senhas hasheadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Documentação clara

### ❌ O que Evitar

- ❌ Salvar senhas em plain text
- ❌ Expor dados sensíveis em logs
- ❌ Sem validação de entrada
- ❌ Sem tratamento de erro
- ❌ Secrets no código/git
- ❌ CORS aberto demais (`*`)
- ❌ Sem rate limiting
- ❌ Sem autenticação em rotas

### Checklist After Level 7

- ✅ Criar servidor Express
- ✅ Estruturar rotas e controllers
- ✅ Conectar banco de dados
- ✅ Implementar CRUD
- ✅ Adicionar autenticação JWT
- ✅ Validar dados
- ✅ Tratar erros
- ✅ Fazer deploy
- ✅ Testar com Postman/Insomnia
- ✅ Documentar API

### Ferramentas Essenciais

- **Express** - Framework web
- **Mongoose/Sequelize** - ORM/ODM
- **JWT** - Autenticação
- **Joi** - Validação
- **Postman** - Teste de API
- **PM2** - Process manager
- **Nginx** - Reverse proxy

---

## 📌 Slide 16: Próximos Passos

### Aprender Depois

1. **GraphQL** - Alternativa a REST
2. **WebSockets** - Comunicação em tempo real
3. **Rate Limiting** - Proteção contra abuso
4. **Caching** - Redis para performance
5. **Logging** - Winston/Morgan
6. **Testing** - Jest/Mocha
7. **Docker** - Containerização
8. **CI/CD** - Automação
9. **Microserviços** - Arquitetura escalável
10. **Message Queues** - RabbitMQ/Redis

### Recursos Úteis

- Express Docs: https://expressjs.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io
- REST API Best Practices
- Node.js Best Practices
- Postman Learning Center

---

## 🎯 Resumo Final - Level 7

**Node.js + Express cobre:**

- ✅ Servidor JavaScript no backend
- ✅ Framework web completo
- ✅ RESTful APIs
- ✅ Integração com bancos de dados
- ✅ Autenticação e autorização
- ✅ Validação de dados
- ✅ Middleware customizado
- ✅ Deployment em produção

**Você agora pode:**

- ✅ Criar APIs profissionais
- ✅ Trabalhar com múltiplos bancos de dados
- ✅ Implementar segurança
- ✅ Fazer deploy em servidores
- ✅ Trabalhar em equipe backend

**Parabéns!** Você domina **backend com Node.js**! 🚀

---

## 💡 Motivação Final

Node.js revolucionou o desenvolvimento backend permitindo usar JavaScript em todo o stack. Continue estudando, praticando e construindo aplicações cada vez mais complexas!

**Seu próximo passo:** Integrar backend (Node.js + Express) com frontend (Angular)! 🔗

Estamos quase lá! 🎉✨
