# 🏆 Level 9 — Projeto Final

## Objetivo
Consolidar **todo o conhecimento** dos levels anteriores construindo uma aplicação
fullstack completa, profissional e pronta para o portfólio

---

## 📌 Slide 1: O Projeto Final

### O que vamos construir?
**TaskManager Pro** — Sistema completo de gerenciamento de tarefas e projetos

### Por que este projeto?
```
✅ Usa HTML, CSS, JavaScript (Levels 1-3)
✅ Usa TypeScript avançado (Level 4)
✅ Usa conceitos de lógica (Level 5)
✅ Usa Angular completo (Level 6)
✅ Usa Node.js + Express (Level 7)
✅ Usa integração Fullstack (Level 8)
✅ Pronto para o portfólio
```

### Funcionalidades do Projeto
```
🔐 Autenticação completa (registro, login, logout)
📋 CRUD de projetos
✅ CRUD de tarefas por projeto
👥 Perfil de usuário editável
🔍 Filtros e buscas
📊 Dashboard com estatísticas
📱 Design responsivo
🌙 Modo escuro/claro
🚀 Deploy em produção
```

### Preview da Arquitetura
```
┌──────────────────────────────────────────────┐
│               TaskManager Pro                 │
├─────────────────────┬────────────────────────┤
│   FRONTEND (Angular) │   BACKEND (Node.js)    │
│                     │                        │
│  ┌───────────────┐  │  ┌──────────────────┐  │
│  │  Login/Signup │  │  │  Auth Controller  │  │
│  │  Dashboard    │  │  │  Projetos Routes  │  │
│  │  Projetos     │  │  │  Tarefas Routes   │  │
│  │  Tarefas      │  │  │  Usuário Routes   │  │
│  │  Perfil       │  │  │  JWT Middleware   │  │
│  └───────────────┘  │  └──────────────────┘  │
│                     │           │             │
└─────────────────────┴───────────┼─────────────┘
                                  │
                         ┌────────▼────────┐
                         │    MongoDB       │
                         │  Atlas (Cloud)   │
                         └─────────────────┘
```

---

## 📌 Slide 2: Planejamento do Projeto

### Etapas de Desenvolvimento
```
Semana 1 → Setup e Backend base
Semana 2 → Backend completo (Auth + CRUD)
Semana 3 → Frontend base (Angular setup)
Semana 4 → Frontend completo (telas)
Semana 5 → Integração e testes
Semana 6 → Deploy e documentação
```

### Diagrama de Entidades
```
Usuario
├── _id
├── nome
├── email
├── senha (hash)
├── avatar
├── bio
└── createdAt

Projeto
├── _id
├── nome
├── descricao
├── cor (hex)
├── icone (emoji)
├── usuario (ref → Usuario)
├── ativo
└── createdAt

Tarefa
├── _id
├── titulo
├── descricao
├── completa
├── prioridade (baixa/media/alta)
├── tags []
├── dataPrazo
├── projeto (ref → Projeto)
├── usuario (ref → Usuario)
└── createdAt
```

### Endpoints da API
```
AUTH
POST   /api/auth/registrar
POST   /api/auth/login
GET    /api/auth/perfil

PROJETOS
GET    /api/projetos
POST   /api/projetos
GET    /api/projetos/:id
PUT    /api/projetos/:id
DELETE /api/projetos/:id

TAREFAS
GET    /api/tarefas?projetoId=xxx
POST   /api/tarefas
PUT    /api/tarefas/:id
DELETE /api/tarefas/:id

USUARIO
PUT    /api/usuario/perfil
PUT    /api/usuario/senha
```

---

## 📌 Slide 3: Backend - Setup Completo

### Estrutura de Pastas
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projetoController.js
│   │   ├── tarefaController.js
│   │   └── usuarioController.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Projeto.js
│   │   └── Tarefa.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projetos.js
│   │   ├── tarefas.js
│   │   └── usuario.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validacao.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

### package.json
```json
{
  "name": "taskmanager-backend",
  "version": "1.0.0",
  "description": "API do TaskManager Pro",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "joi": "^17.9.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0"
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
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmanager
JWT_SECRET=taskmanager_super_secret_key_2026
FRONTEND_URL=http://localhost:4200
```

### server.js
```javascript
// filepath: backend/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projetosRoutes = require('./routes/projetos');
const tarefasRoutes = require('./routes/tarefas');
const usuarioRoutes = require('./routes/usuario');

const app = express();

// Middlewares globais
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Log
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/tarefas', tarefasRoutes);
app.use('/api/usuario', usuarioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'TaskManager Pro API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.path} não encontrada` });
});

// Error Handler Global
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.message);
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
});

// Conectar e iniciar
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas conectado!');
    app.listen(process.env.PORT, () => {
      console.log(`✅ API rodando em http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro MongoDB:', err.message);
    process.exit(1);
  });
```

---

## 📌 Slide 4: Backend - Models

### Model Usuario
```javascript
// filepath: backend/src/models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome obrigatório'],
    trim: true,
    minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
    maxlength: [100, 'Nome muito longo']
  },
  email: {
    type: String,
    required: [true, 'Email obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
    select: false
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [300, 'Bio muito longa'],
    default: ''
  }
}, {
  timestamps: true
});

// Hash da senha
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 12);
  next();
});

// Comparar senha
usuarioSchema.methods.compararSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

// Remover senha do JSON
usuarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
```

### Model Projeto
```javascript
// filepath: backend/src/models/Projeto.js
const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome obrigatório'],
    trim: true,
    maxlength: [100, 'Nome muito longo']
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, 'Descrição muito longa'],
    default: ''
  },
  cor: {
    type: String,
    default: '#667eea'
  },
  icone: {
    type: String,
    default: '📁'
  },
  ativo: {
    type: Boolean,
    default: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Projeto', projetoSchema);
```

### Model Tarefa
```javascript
// filepath: backend/src/models/Tarefa.js
const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título obrigatório'],
    trim: true,
    maxlength: [255, 'Título muito longo']
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [1000, 'Descrição muito longa'],
    default: ''
  },
  completa: {
    type: Boolean,
    default: false
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
    default: 'media'
  },
  tags: [{
    type: String,
    trim: true
  }],
  dataPrazo: {
    type: Date
  },
  projeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projeto',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarefa', tarefaSchema);
```

---

## 📌 Slide 5: Backend - Controllers

### Auth Controller
```javascript
// filepath: backend/src/controllers/authController.js
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const gerarToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (await Usuario.findOne({ email })) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const usuario = await Usuario.create({ nome, email, senha });

    res.status(201).json({
      mensagem: 'Conta criada com sucesso! 🎉',
      token: gerarToken(usuario._id),
      usuario
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email }).select('+senha');
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    res.json({
      mensagem: 'Bem-vindo de volta! 👋',
      token: gerarToken(usuario._id),
      usuario
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
```

### Projeto Controller
```javascript
// filepath: backend/src/controllers/projetoController.js
const Projeto = require('../models/Projeto');
const Tarefa = require('../models/Tarefa');

exports.listar = async (req, res) => {
  try {
    const projetos = await Projeto.find({
      usuario: req.usuarioId,
      ativo: true
    }).sort({ createdAt: -1 });

    // Adicionar contagem de tarefas por projeto
    const projetosComContagem = await Promise.all(
      projetos.map(async (projeto) => {
        const total = await Tarefa.countDocuments({ projeto: projeto._id });
        const completas = await Tarefa.countDocuments({
          projeto: projeto._id,
          completa: true
        });
        return { ...projeto.toObject(), totalTarefas: total, tarefasCompletas: completas };
      })
    );

    res.json({ projetos: projetosComContagem });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, descricao, cor, icone } = req.body;

    const projeto = await Projeto.create({
      nome,
      descricao,
      cor,
      icone,
      usuario: req.usuarioId
    });

    res.status(201).json({ mensagem: 'Projeto criado! 🎯', projeto });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscar = async (req, res) => {
  try {
    const projeto = await Projeto.findOne({
      _id: req.params.id,
      usuario: req.usuarioId
    });

    if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });

    const tarefas = await Tarefa.find({ projeto: projeto._id }).sort({ createdAt: -1 });
    res.json({ projeto, tarefas });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, descricao, cor, icone } = req.body;

    const projeto = await Projeto.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      { nome, descricao, cor, icone },
      { new: true, runValidators: true }
    );

    if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json({ mensagem: 'Projeto atualizado!', projeto });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const projeto = await Projeto.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      { ativo: false },
      { new: true }
    );

    if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });

    // Deletar tarefas do projeto
    await Tarefa.deleteMany({ projeto: req.params.id });

    res.json({ mensagem: 'Projeto e tarefas deletados!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
```

### Tarefa Controller
```javascript
// filepath: backend/src/controllers/tarefaController.js
const Tarefa = require('../models/Tarefa');

exports.listar = async (req, res) => {
  try {
    const { projetoId, completa, prioridade, busca } = req.query;
    const filtro = { usuario: req.usuarioId };

    if (projetoId) filtro.projeto = projetoId;
    if (completa !== undefined) filtro.completa = completa === 'true';
    if (prioridade) filtro.prioridade = prioridade;
    if (busca) filtro.titulo = { $regex: busca, $options: 'i' };

    const tarefas = await Tarefa.find(filtro)
      .populate('projeto', 'nome cor icone')
      .sort({ createdAt: -1 });

    res.json({ total: tarefas.length, tarefas });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, prioridade, tags, dataPrazo, projetoId } = req.body;

    const tarefa = await Tarefa.create({
      titulo,
      descricao,
      prioridade,
      tags,
      dataPrazo,
      projeto: projetoId,
      usuario: req.usuarioId
    });

    const tarefaPopulada = await tarefa.populate('projeto', 'nome cor icone');
    res.status(201).json({ mensagem: 'Tarefa criada! ✅', tarefa: tarefaPopulada });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body,
      { new: true, runValidators: true }
    ).populate('projeto', 'nome cor icone');

    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa atualizada!', tarefa });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuarioId
    });

    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa deletada!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
```

---

## 📌 Slide 6: Backend - Middleware e Rotas

### Middleware Auth
```javascript
// filepath: backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
```

### Rotas
```javascript
// filepath: backend/src/routes/projetos.js
const express = require('express');
const ctrl = require('../controllers/projetoController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth); // Proteger todas

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);
router.get('/:id', ctrl.buscar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

module.exports = router;
```

```javascript
// filepath: backend/src/routes/tarefas.js
const express = require('express');
const ctrl = require('../controllers/tarefaController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

module.exports = router;
```

```javascript
// filepath: backend/src/routes/usuario.js
const express = require('express');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.use(auth);

// Atualizar perfil
router.put('/perfil', async (req, res) => {
  try {
    const { nome, bio, avatar } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.usuarioId,
      { nome, bio, avatar },
      { new: true, runValidators: true }
    );

    res.json({ mensagem: 'Perfil atualizado! 🎉', usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Alterar senha
router.put('/senha', async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;

    const usuario = await Usuario.findById(req.usuarioId).select('+senha');
    if (!(await usuario.compararSenha(senhaAtual))) {
      return res.status(400).json({ erro: 'Senha atual incorreta' });
    }

    usuario.senha = novaSenha;
    await usuario.save();

    res.json({ mensagem: 'Senha alterada com sucesso! 🔒' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
```

---

## 📌 Slide 7: Frontend - Setup Angular

### Estrutura de Pastas
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── tarefa-card/
│   │   │   └── projeto-card/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── dashboard/
│   │   │   ├── projetos/
│   │   │   ├── projeto-detalhe/
│   │   │   └── perfil/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── projeto.service.ts
│   │   │   └── tarefa.service.ts
│   │   ├── models/
│   │   │   ├── usuario.model.ts
│   │   │   ├── projeto.model.ts
│   │   │   └── tarefa.model.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── app.component.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css
└── angular.json
```

### app.module.ts
```typescript
// filepath: frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ProjetoDetalheComponent } from './pages/projeto-detalhe/projeto-detalhe.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TarefaCardComponent } from './components/tarefa-card/tarefa-card.component';
import { ProjetoCardComponent } from './components/projeto-card/projeto-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProjetosComponent,
    ProjetoDetalheComponent,
    PerfilComponent,
    HeaderComponent,
    SidebarComponent,
    TarefaCardComponent,
    ProjetoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### app-routing.module.ts
```typescript
// filepath: frontend/src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ProjetoDetalheComponent } from './pages/projeto-detalhe/projeto-detalhe.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projetos',
    component: ProjetosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projetos/:id',
    component: ProjetoDetalheComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## 📌 Slide 8: Frontend - Models e Services

### Models
```typescript
// filepath: frontend/src/app/models/usuario.model.ts
export interface Usuario {
  _id: string;
  nome: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: Date;
}

export interface AuthResponse {
  mensagem: string;
  token: string;
  usuario: Usuario;
}
```

```typescript
// filepath: frontend/src/app/models/projeto.model.ts
export interface Projeto {
  _id: string;
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  ativo: boolean;
  usuario: string;
  totalTarefas?: number;
  tarefasCompletas?: number;
  createdAt: Date;
}
```

```typescript
// filepath: frontend/src/app/models/tarefa.model.ts
export type Prioridade = 'baixa' | 'media' | 'alta';

export interface Tarefa {
  _id: string;
  titulo: string;
  descricao: string;
  completa: boolean;
  prioridade: Prioridade;
  tags: string[];
  dataPrazo?: Date;
  projeto: {
    _id: string;
    nome: string;
    cor: string;
    icone: string;
  };
  usuario: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Auth Service
```typescript
// filepath: frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private _usuario = new BehaviorSubject<Usuario | null>(null);

  usuario$ = this._usuario.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const salvo = localStorage.getItem('usuario');
    if (salvo) this._usuario.next(JSON.parse(salvo));
  }

  get usuario(): Usuario | null { return this._usuario.value; }
  get isLogado(): boolean { return !!localStorage.getItem('token'); }

  registrar(dados: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registrar`, dados)
      .pipe(tap(r => this.salvar(r)));
  }

  login(dados: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dados)
      .pipe(tap(r => this.salvar(r)));
  }

  logout(): void {
    localStorage.clear();
    this._usuario.next(null);
    this.router.navigate(['/login']);
  }

  atualizarUsuarioLocal(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this._usuario.next(usuario);
  }

  private salvar(resp: AuthResponse): void {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario));
    this._usuario.next(resp.usuario);
  }
}
```

### Projeto Service
```typescript
// filepath: frontend/src/app/services/projeto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Projeto } from '../models/projeto.model';

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private apiUrl = `${environment.apiUrl}/projetos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ projetos: Projeto[] }> {
    return this.http.get<{ projetos: Projeto[] }>(this.apiUrl);
  }

  buscar(id: string): Observable<{ projeto: Projeto; tarefas: any[] }> {
    return this.http.get<{ projeto: Projeto; tarefas: any[] }>(`${this.apiUrl}/${id}`);
  }

  criar(dados: Partial<Projeto>): Observable<{ mensagem: string; projeto: Projeto }> {
    return this.http.post<{ mensagem: string; projeto: Projeto }>(this.apiUrl, dados);
  }

  atualizar(id: string, dados: Partial<Projeto>): Observable<{ mensagem: string; projeto: Projeto }> {
    return this.http.put<{ mensagem: string; projeto: Projeto }>(`${this.apiUrl}/${id}`, dados);
  }

  deletar(id: string): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}
```

---

## 📌 Slide 9: Frontend - Dashboard

### Dashboard Component
```typescript
// filepath: frontend/src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjetoService } from '../../services/projeto.service';
import { TarefaService } from '../../services/tarefa.service';
import { Projeto } from '../../models/projeto.model';
import { Tarefa } from '../../models/tarefa.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projetos: Projeto[] = [];
  tarefasRecentes: Tarefa[] = [];
  loading = true;

  stats = {
    totalProjetos: 0,
    totalTarefas: 0,
    tarefasCompletas: 0,
    tarefasPendentes: 0
  };

  constructor(
    public authService: AuthService,
    private projetoService: ProjetoService,
    private tarefaService: TarefaService
  ) {}

  ngOnInit() {
    this.carregarDashboard();
  }

  get progresso(): number {
    if (this.stats.totalTarefas === 0) return 0;
    return Math.round((this.stats.tarefasCompletas / this.stats.totalTarefas) * 100);
  }

  carregarDashboard() {
    forkJoin({
      projetos: this.projetoService.listar(),
      tarefas: this.tarefaService.listar()
    }).subscribe({
      next: ({ projetos, tarefas }) => {
        this.projetos = projetos.projetos.slice(0, 4);
        this.tarefasRecentes = tarefas.tarefas.slice(0, 5);

        this.stats = {
          totalProjetos: projetos.projetos.length,
          totalTarefas: tarefas.total,
          tarefasCompletas: tarefas.tarefas.filter(t => t.completa).length,
          tarefasPendentes: tarefas.tarefas.filter(t => !t.completa).length
        };

        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getSaudacao(): string {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  }
}
```

### Dashboard Template
```html
<!-- filepath: frontend/src/app/pages/dashboard/dashboard.component.html -->
<div class="dashboard">

  <!-- Saudação -->
  <div class="saudacao">
    <h1>{{ getSaudacao() }}, {{ authService.usuario?.nome?.split(' ')[0] }}! 👋</h1>
    <p>Aqui está um resumo do seu dia</p>
  </div>

  <!-- Loading -->
  <div class="loading-overlay" *ngIf="loading">
    <div class="spinner"></div>
  </div>

  <!-- Stats Cards -->
  <div class="stats-grid" *ngIf="!loading">

    <div class="stat-card azul">
      <div class="stat-icon">📁</div>
      <div class="stat-info">
        <span class="stat-numero">{{ stats.totalProjetos }}</span>
        <span class="stat-label">Projetos</span>
      </div>
    </div>

    <div class="stat-card verde">
      <div class="stat-icon">✅</div>
      <div class="stat-info">
        <span class="stat-numero">{{ stats.tarefasCompletas }}</span>
        <span class="stat-label">Concluídas</span>
      </div>
    </div>

    <div class="stat-card laranja">
      <div class="stat-icon">⏳</div>
      <div class="stat-info">
        <span class="stat-numero">{{ stats.tarefasPendentes }}</span>
        <span class="stat-label">Pendentes</span>
      </div>
    </div>

    <div class="stat-card roxo">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <span class="stat-numero">{{ progresso }}%</span>
        <span class="stat-label">Progresso</span>
      </div>
    </div>

  </div>

  <!-- Barra de Progresso Geral -->
  <div class="progresso-card" *ngIf="!loading">
    <div class="progresso-header">
      <h3>Progresso Geral</h3>
      <span>{{ stats.tarefasCompletas }}/{{ stats.totalTarefas }} tarefas</span>
    </div>
    <div class="progresso-bar">
      <div class="progresso-fill" [style.width.%]="progresso"></div>
    </div>
    <p class="progresso-texto">{{ progresso }}% concluído</p>
  </div>

  <div class="dashboard-grid" *ngIf="!loading">

    <!-- Projetos Recentes -->
    <div class="section-card">
      <div class="section-header">
        <h2>📁 Projetos Recentes</h2>
        <a routerLink="/projetos" class="ver-todos">Ver todos →</a>
      </div>

      <div class="projetos-lista">
        <div class="projeto-item" *ngFor="let projeto of projetos">
          <div class="projeto-icone" [style.background]="projeto.cor + '20'">
            <span>{{ projeto.icone }}</span>
          </div>
          <div class="projeto-info">
            <strong>{{ projeto.nome }}</strong>
            <span>{{ projeto.tarefasCompletas }}/{{ projeto.totalTarefas }} tarefas</span>
          </div>
          <a [routerLink]="['/projetos', projeto._id]" class="btn-ir">→</a>
        </div>

        <div class="vazio" *ngIf="projetos.length === 0">
          <p>📭 Nenhum projeto ainda</p>
          <a routerLink="/projetos" class="btn-criar">Criar projeto</a>
        </div>
      </div>
    </div>

    <!-- Tarefas Recentes -->
    <div class="section-card">
      <div class="section-header">
        <h2>✅ Tarefas Recentes</h2>
      </div>

      <div class="tarefas-lista">
        <div
          class="tarefa-item"
          *ngFor="let tarefa of tarefasRecentes"
          [class.completa]="tarefa.completa"
        >
          <div class="tarefa-status">
            <span *ngIf="tarefa.completa">✅</span>
            <span *ngIf="!tarefa.completa">⏳</span>
          </div>
          <div class="tarefa-info">
            <strong>{{ tarefa.titulo }}</strong>
            <span class="tarefa-projeto">
              {{ tarefa.projeto?.icone }} {{ tarefa.projeto?.nome }}
            </span>
          </div>
          <span class="badge" [class]="'prioridade-' + tarefa.prioridade">
            {{ tarefa.prioridade }}
          </span>
        </div>

        <div class="vazio" *ngIf="tarefasRecentes.length === 0">
          <p>📭 Nenhuma tarefa ainda</p>
        </div>
      </div>
    </div>

  </div>
</div>
```

### Dashboard CSS
```css
/* filepath: frontend/src/app/pages/dashboard/dashboard.component.css */
.dashboard {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.saudacao {
  margin-bottom: 30px;
}

.saudacao h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.saudacao p {
  color: #666;
  margin: 5px 0 0;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border-left: 5px solid;
  transition: transform 0.2s;
}

.stat-card:hover { transform: translateY(-3px); }
.stat-card.azul { border-color: #667eea; }
.stat-card.verde { border-color: #2ecc71; }
.stat-card.laranja { border-color: #f39c12; }
.stat-card.roxo { border-color: #9b59b6; }

.stat-icon { font-size: 2rem; }

.stat-numero {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  display: block;
  color: #888;
  font-size: 0.9rem;
}

/* Progresso */
.progresso-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.progresso-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.progresso-header h3 { margin: 0; color: #333; }

.progresso-bar {
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}

.progresso-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #2ecc71);
  border-radius: 6px;
  transition: width 0.6s ease;
}

.progresso-texto {
  color: #888;
  margin: 8px 0 0;
  font-size: 0.9rem;
}

/* Grid principal */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 { margin: 0; font-size: 1.2rem; color: #333; }
.ver-todos { color: #667eea; text-decoration: none; font-size: 0.9rem; }

/* Projetos */
.projeto-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.projeto-icone {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.projeto-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.projeto-info strong { color: #333; }
.projeto-info span { color: #888; font-size: 0.85rem; }

.btn-ir {
  color: #667eea;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-ir:hover { background: #667eea10; }

/* Tarefas */
.tarefa-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.tarefa-item.completa { opacity: 0.6; }

.tarefa-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tarefa-info strong { color: #333; font-size: 0.95rem; }
.tarefa-projeto { color: #888; font-size: 0.8rem; margin-top: 2px; }

/* Badges */
.badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
.prioridade-alta { background: #fde8e8; color: #c0392b; }
.prioridade-media { background: #fef9e7; color: #d68910; }
.prioridade-baixa { background: #e9f7ef; color: #1e8449; }

/* Vazio */
.vazio {
  text-align: center;
  padding: 30px;
  color: #888;
}

.btn-criar {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid { grid-template-columns: 1fr; }
  .dashboard { padding: 15px; }
}
```

---

## 📌 Slide 10: Frontend - Sidebar e Header

### Sidebar Component
```typescript
// filepath: frontend/src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: '🏠', rota: '/dashboard' },
    { label: 'Projetos', icon: '📁', rota: '/projetos' },
    { label: 'Perfil', icon: '👤', rota: '/perfil' }
  ];

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  isAtivo(rota: string): boolean {
    return this.router.url === rota;
  }

  logout() {
    this.authService.logout();
  }
}
```

```html
<!-- filepath: frontend/src/app/components/sidebar/sidebar.component.html -->
<aside class="sidebar">

  <!-- Logo -->
  <div class="sidebar-logo">
    <span class="logo-icon">📝</span>
    <span class="logo-texto">TaskManager</span>
  </div>

  <!-- Avatar do usuário -->
  <div class="sidebar-usuario">
    <div class="avatar">
      {{ authService.usuario?.nome?.charAt(0).toUpperCase() }}
    </div>
    <div class="usuario-info">
      <strong>{{ authService.usuario?.nome }}</strong>
      <small>{{ authService.usuario?.email }}</small>
    </div>
  </div>

  <!-- Menu -->
  <nav class="sidebar-nav">
    <a
      *ngFor="let item of menuItems"
      [routerLink]="item.rota"
      class="nav-item"
      [class.ativo]="isAtivo(item.rota)"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </a>
  </nav>

  <!-- Logout -->
  <button (click)="logout()" class="btn-logout">
    <span>🚪</span>
    <span>Sair</span>
  </button>

</aside>
```

```css
/* filepath: frontend/src/app/components/sidebar/sidebar.component.css */
.sidebar {
  width: 260px;
  height: 100vh;
  background: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px 25px;
  border-bottom: 1px solid #ffffff15;
  margin-bottom: 20px;
}

.logo-icon { font-size: 1.8rem; }
.logo-texto { font-size: 1.2rem; font-weight: bold; }

.sidebar-usuario {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 10px;
  background: #ffffff10;
  border-radius: 12px;
  margin-bottom: 25px;
}

.avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.usuario-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.usuario-info strong {
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.usuario-info small {
  color: #aaa;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 10px;
  color: #aaa;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #ffffff15;
  color: white;
}

.nav-item.ativo {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.nav-icon { font-size: 1.2rem; }
.nav-label { font-size: 0.95rem; }

.btn-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: none;
  border: 1px solid #ffffff20;
  border-radius: 10px;
  color: #aaa;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  margin-top: 10px;
}

.btn-logout:hover {
  background: #ff4d4d20;
  border-color: #ff4d4d50;
  color: #ff6b6b;
}
```

### App Component (Layout com Sidebar)
```typescript
// filepath: frontend/src/app/app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  get isAuthPage(): boolean {
    return ['/login', '/registrar'].includes(this.router.url);
  }
}
```

```html
<!-- filepath: frontend/src/app/app.component.html -->
<div class="app-layout">

  <!-- Sidebar apenas quando logado -->
  <app-sidebar *ngIf="authService.isLogado && !isAuthPage"></app-sidebar>

  <!-- Conteúdo principal -->
  <main [class.com-sidebar]="authService.isLogado && !isAuthPage">
    <router-outlet></router-outlet>
  </main>

</div>
```

```css
/* filepath: frontend/src/app/app.component.css */
.app-layout {
  display: flex;
}

main {
  flex: 1;
  min-height: 100vh;
  background: #f5f7fb;
}

main.com-sidebar {
  margin-left: 260px;
}
```

---

## 📌 Slide 11: Frontend - Interceptor e Guard

### Auth Interceptor
```typescript
// filepath: frontend/src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
```

### Auth Guard
```typescript
// filepath: frontend/src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogado) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
```

---

## 📌 Slide 12: Frontend - Página de Projetos

### Projetos Component
```typescript
// filepath: frontend/src/app/pages/projetos/projetos.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto.model';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  projetos: Projeto[] = [];
  loading = false;
  mostrarModal = false;
  projetoEditando: Projeto | null = null;
  form: FormGroup;

  cores = ['#667eea', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  icones = ['📁', '🚀', '💡', '🎯', '🔧', '📊', '🎨', '💻'];

  constructor(
    private projetoService: ProjetoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      cor: ['#667eea'],
      icone: ['📁']
    });
  }

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.loading = true;
    this.projetoService.listar().subscribe({
      next: (resp) => {
        this.projetos = resp.projetos;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  abrirModal(projeto?: Projeto) {
    this.projetoEditando = projeto || null;
    if (projeto) {
      this.form.patchValue(projeto);
    } else {
      this.form.reset({ cor: '#667eea', icone: '📁' });
    }
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.projetoEditando = null;
  }

  salvarProjeto() {
    if (this.form.invalid) return;

    const req = this.projetoEditando
      ? this.projetoService.atualizar(this.projetoEditando._id, this.form.value)
      : this.projetoService.criar(this.form.value);

    req.subscribe({
      next: () => {
        this.carregarProjetos();
        this.fecharModal();
      }
    });
  }

  deletarProjeto(id: string) {
    if (!confirm('Deletar projeto e todas as suas tarefas?')) return;
    this.projetoService.deletar(id).subscribe({
      next: () => {
        this.projetos = this.projetos.filter(p => p._id !== id);
      }
    });
  }
}
```

```html
<!-- filepath: frontend/src/app/pages/projetos/projetos.component.html -->
<div class="projetos-page">
  <div class="page-header">
    <h1>📁 Meus Projetos</h1>
    <button (click)="abrirModal()" class="btn-novo">+ Novo Projeto</button>
  </div>

  <div class="loading" *ngIf="loading">Carregando projetos...</div>

  <!-- Grid de Projetos -->
  <div class="projetos-grid" *ngIf="!loading">

    <div class="projeto-card" *ngFor="let projeto of projetos">
      <div class="card-header" [style.background]="projeto.cor">
        <span class="card-icone">{{ projeto.icone }}</span>
        <div class="card-acoes">
          <button (click)="abrirModal(projeto)" class="btn-acao">✏️</button>
          <button (click)="deletarProjeto(projeto._id)" class="btn-acao">🗑️</button>
        </div>
      </div>

      <div class="card-body">
        <h3>{{ projeto.nome }}</h3>
        <p *ngIf="projeto.descricao">{{ projeto.descricao }}</p>

        <div class="card-stats">
          <span>✅ {{ projeto.tarefasCompletas }}/{{ projeto.totalTarefas }} tarefas</span>
        </div>

        <div class="card-progresso">
          <div
            class="progresso-fill"
            [style.width.%]="projeto.totalTarefas
              ? (projeto.tarefasCompletas! / projeto.totalTarefas) * 100
              : 0"
            [style.background]="projeto.cor"
          ></div>
        </div>

        <a [routerLink]="['/projetos', projeto._id]" class="btn-abrir">
          Abrir Projeto →
        </a>
      </div>
    </div>

    <div class="card-novo" (click)="abrirModal()">
      <span>+</span>
      <p>Novo Projeto</p>
    </div>

  </div>

  <!-- Modal -->
  <div class="modal-overlay" *ngIf="mostrarModal" (click)="fecharModal()">
    <div class="modal" (click)="$event.stopPropagation()">
      <h2>{{ projetoEditando ? 'Editar' : 'Novo' }} Projeto</h2>

      <form [formGroup]="form" (ngSubmit)="salvarProjeto()">

        <div class="form-group">
          <label>Nome *</label>
          <input type="text" formControlName="nome" placeholder="Nome do projeto">
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea formControlName="descricao" placeholder="Descrição..."></textarea>
        </div>

        <div class="form-group">
          <label>Ícone</label>
          <div class="icones-grid">
            <span
              *ngFor="let icone of icones"
              (click)="form.patchValue({ icone })"
              [class.selecionado]="form.get('icone')?.value === icone"
            >{{ icone }}</span>
          </div>
        </div>

        <div class="form-group">
          <label>Cor</label>
          <div class="cores-grid">
            <div
              *ngFor="let cor of cores"
              (click)="form.patchValue({ cor })"
              [style.background]="cor"
              class="cor-item"
              [class.selecionada]="form.get('cor')?.value === cor"
            ></div>
          </div>
        </div>

        <div class="modal-acoes">
          <button type="button" (click)="fecharModal()" class="btn-cancelar">Cancelar</button>
          <button type="submit" [disabled]="form.invalid" class="btn-salvar">Salvar</button>
        </div>

      </form>
    </div>
  </div>

</div>
```

---

## 📌 Slide 13: Estilos Globais

### styles.css
```css
/* filepath: frontend/src/styles.css */

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Variáveis */
:root {
  --primary: #667eea;
  --primary-dark: #5568d3;
  --secondary: #764ba2;
  --success: #2ecc71;
  --danger: #e74c3c;
  --warning: #f39c12;
  --bg: #f5f7fb;
  --card-bg: #ffffff;
  --text: #333333;
  --text-light: #888888;
  --border: #eeeeee;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --radius: 12px;
}

/* Base */
body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

/* Inputs globais */
input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  font-size: 15px;
  transition: border-color 0.2s;
  font-family: inherit;
  background: white;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
}

input.invalid, select.invalid, textarea.invalid {
  border-color: var(--danger);
}

textarea { resize: vertical; min-height: 100px; }

/* Botões */
.btn-primary {
  padding: 12px 24px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.btn-danger {
  padding: 10px 20px;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.2s;
}

.btn-danger:hover { background: #c0392b; }

/* Cards */
.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  box-shadow: var(--shadow);
}

/* Badges de prioridade */
.badge-alta { background: #fde8e8; color: #c0392b; }
.badge-media { background: #fef9e7; color: #d68910; }
.badge-baixa { background: #e9f7ef; color: #1e8449; }

/* Loading Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Formulários */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.error-msg {
  display: block;
  color: var(--danger);
  font-size: 12px;
  margin-top: 5px;
}

/* Scrollbar customizada */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #999; }

/* Responsivo */
@media (max-width: 768px) {
  main.com-sidebar { margin-left: 0 !important; }
}
```

---

## 📌 Slide 14: Deploy em Produção

### Estratégia de Deploy
```
┌─────────────────────────────────────┐
│           PRODUÇÃO                   │
├──────────────┬──────────────────────┤
│   Frontend   │      Backend         │
│   Netlify    │      Railway         │
│  (Angular)   │  (Node.js Express)   │
└──────────────┴──────────┬───────────┘
                          │
                 ┌────────▼────────┐
                 │  MongoDB Atlas  │
                 │  (Database)     │
                 └─────────────────┘
```

### 1. MongoDB Atlas (Gratuito)
```
1. Acesse: https://cloud.mongodb.com
2. Crie conta e cluster grátis (M0)
3. Em "Database Access" → Criar usuário
4. Em "Network Access" → Allow from anywhere (0.0.0.0/0)
5. Copie a connection string:
   mongodb+srv://user:pass@cluster.mongodb.net/taskmanager
```

### 2. Deploy Backend (Railway)
```bash
# 1. Criar conta em railway.app
# 2. Conectar repositório GitHub do backend

# 3. Adicionar variáveis de ambiente no Railway:
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=chave_super_segura_producao
FRONTEND_URL=https://seu-app.netlify.app

# 4. Deploy automático ao fazer push no GitHub
git add .
git commit -m "feat: backend completo"
git push origin main
# Railway faz deploy automático!
```

### 3. Deploy Frontend (Netlify)
```bash
# 1. Atualizar environment.prod.ts com URL real do backend

# 2. Build de produção
cd frontend
ng build --configuration production

# 3. Criar conta em netlify.com
# 4. Arrastar pasta dist/frontend para app.netlify.com/drop

# OU via CLI:
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist/frontend
```

### 4. Configurar _redirects (SPA)
```
# filepath: frontend/src/assets/_redirects
/*    /index.html   200
```

```json
// filepath: frontend/angular.json
"assets": [
  "src/favicon.ico",
  "src/assets"
]
```

### Checklist de Deploy
```
Backend (Railway)
✅ Variáveis de ambiente configuradas
✅ MongoDB Atlas conectado
✅ CORS com URL do frontend
✅ Route de health check respondendo

Frontend (Netlify)
✅ environment.prod.ts com URL real do backend
✅ Build de produção gerado
✅ Arquivo _redirects configurado
✅ Deploy feito com sucesso
```

---

## 📌 Slide 15: README e Documentação

### README.md Profissional
```markdown
# 📝 TaskManager Pro

Aplicação fullstack de gerenciamento de tarefas e projetos.

## 🚀 Demo
- **Frontend**: https://taskmanager.netlify.app
- **Backend API**: https://taskmanager-api.railway.app

## 🛠️ Tecnologias

### Frontend
- Angular 17
- TypeScript
- RxJS
- Angular Router

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticação)
- Bcrypt (hash de senha)

## 📋 Funcionalidades
- ✅ Autenticação completa (registro/login/logout)
- ✅ CRUD de projetos
- ✅ CRUD de tarefas com filtros
- ✅ Dashboard com estatísticas
- ✅ Perfil editável
- ✅ Design responsivo
- ✅ Proteção de rotas (Guards)
- ✅ Token JWT automático (Interceptors)

## ⚙️ Como Rodar

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configure suas variáveis de ambiente
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
ng serve
\`\`\`

Acesse: http://localhost:4200

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/registrar | Criar conta |
| POST | /api/auth/login | Fazer login |
| GET | /api/projetos | Listar projetos |
| POST | /api/projetos | Criar projeto |
| GET | /api/tarefas | Listar tarefas |
| POST | /api/tarefas | Criar tarefa |

## 👨‍💻 Autor
Desenvolvido como projeto final do curso SimpleTechnology
```

---

## 📌 Slide 16: Checklist Final

### ✅ O que você entregou

```
BACKEND ✅
├── Servidor Express configurado
├── MongoDB Atlas conectado
├── Models: Usuario, Projeto, Tarefa
├── Controllers com CRUD completo
├── Autenticação JWT
├── Middleware de auth
├── Hash de senha (bcrypt)
├── Tratamento de erros
└── Deploy no Railway

FRONTEND ✅
├── Angular configurado com roteamento
├── Auth Service (login/logout)
├── HTTP Interceptor (token automático)
├── Auth Guard (proteção de rotas)
├── Dashboard com estatísticas
├── CRUD de projetos (modal)
├── CRUD de tarefas
├── Sidebar com navegação
├── Design responsivo
└── Deploy no Netlify
```

### 🏆 Habilidades Conquistadas

| Level | Habilidade | Status |
|-------|-----------|--------|
| 1 | HTML semântico | ✅ |
| 2 | CSS e layout | ✅ |
| 3 | JavaScript | ✅ |
| 4 | TypeScript | ✅ |
| 5 | Lógica e algoritmos | ✅ |
| 6 | Angular (SPA) | ✅ |
| 7 | Node.js + Express | ✅ |
| 8 | Integração Fullstack | ✅ |
| 9 | Projeto completo | ✅ 🏆 |

---

## 🎯 Resumo Final - Level 9

**Você construiu:**
- ✅ API REST completa e segura
- ✅ SPA Angular profissional
- ✅ Autenticação JWT end-to-end
- ✅ Deploy em produção real
- ✅ Projeto no portfólio

**Próxima evolução:**
```
→ Testes automatizados (Jest/Cypress)
→ Docker e containers
→ CI/CD (GitHub Actions)
→ TypeScript no backend (NestJS)
→ Cloud computing (AWS/GCP)
```

**Parabéns! Você é um Fullstack Developer!** 🚀🏆🎉

---

## 💡 Mensagem Final

Você começou do zero aprendendo HTML e chegou até aqui construindo uma aplicação
fullstack completa e em produção. Isso é o que separa quem estuda de quem constrói.

**Continue construindo. Continue evoluindo. O mercado espera por você!** 🔥