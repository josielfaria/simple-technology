# 🔗 Level 8 — Fullstack

## Objetivo

Integrar **frontend (Angular)** com **backend (Node.js + Express)** para criar aplicações completas e profissionais

---

## 📌 Slide 1: O que é Fullstack?

### Fullstack Developer

Desenvolvedor que trabalha em **todas as camadas** da aplicação.

### Camadas da Aplicação

```
┌─────────────────────────────────┐
│         FRONTEND (Angular)       │  ← O que o usuário vê
│   HTML + CSS + TypeScript        │
├─────────────────────────────────┤
│         BACKEND (Node.js)        │  ← Lógica de negócio
│         Express + JWT            │
├─────────────────────────────────┤
│        BANCO DE DADOS            │  ← Onde os dados ficam
│       MongoDB / PostgreSQL       │
└─────────────────────────────────┘
```

### O que o Fullstack Developer faz?

- ✅ Cria interfaces com Angular
- ✅ Constrói APIs com Node.js
- ✅ Modela bancos de dados
- ✅ Integra frontend com backend
- ✅ Faz deploy da aplicação completa
- ✅ Resolve problemas ponta a ponta

### Stack que vamos usar

```
Frontend   → Angular 17
Backend    → Node.js + Express
Banco      → MongoDB + Mongoose
Auth       → JWT
Deploy     → Railway / Render
```

---

## 📌 Slide 2: Arquitetura Fullstack

### Fluxo Completo de Dados

```
┌──────────────┐     HTTP Request      ┌──────────────┐
│              │ ─────────────────────▶ │              │
│   Angular    │     (JSON)             │   Express    │
│  (Frontend)  │ ◀───────────────────── │   (Backend)  │
│              │     HTTP Response      │              │
└──────────────┘                        └──────────────┘
                                               │
                                               │ Query
                                               ▼
                                        ┌──────────────┐
                                        │   MongoDB    │
                                        │  (Database)  │
                                        └──────────────┘
```

### Exemplo de Fluxo

```
1. Usuário clica em "Login" no Angular
2. Angular faz POST /api/auth/login com email + senha
3. Express valida credenciais no MongoDB
4. Express gera token JWT e retorna
5. Angular armazena token e redireciona
6. Angular usa token em próximas requisições
```

### Separação de Responsabilidades

```
Frontend     → Exibir dados, capturar input, navegar
Backend      → Validar, processar, proteger dados
Banco        → Armazenar e recuperar dados
```

---

## 📌 Slide 3: Estrutura do Projeto

### Organização Monorepo

```
projeto-fullstack/
├── frontend/                    # Angular App
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── environments/
│   │   └── styles/
│   ├── angular.json
│   └── package.json
│
├── backend/                     # Node.js API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── README.md
└── docker-compose.yml
```

### Criar Projetos

```bash
# Backend
mkdir projeto-fullstack
cd projeto-fullstack
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken joi

# Frontend (em pasta separada)
cd ..
ng new frontend --routing --style=css
cd frontend
ng add @angular/material
```

---

## 📌 Slide 4: Backend - Configuração Base

### Instalar Dependências

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken joi
npm install --save-dev nodemon
```

### .env

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=sua_chave_super_secreta_123456789
FRONTEND_URL=http://localhost:4200
```

### Server Principal

```javascript
// filepath: backend/src/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tarefasRoutes = require("./routes/tarefas");
const usuariosRoutes = require("./routes/usuarios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
    credentials: true,
  }),
);
app.use(express.json());

// Log de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tarefas", tarefasRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// Conectar MongoDB e iniciar servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar MongoDB:", err);
    process.exit(1);
  });
```

---

## 📌 Slide 5: Backend - Models

### Model de Usuário

```javascript
// filepath: backend/src/models/Usuario.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Hash senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 12);
  next();
});

// Método para comparar senha
usuarioSchema.methods.compararSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

// Não retornar senha
usuarioSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
```

### Model de Tarefa

```javascript
// filepath: backend/src/models/Tarefa.js
const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
      maxlength: [255, "Título muito longo"],
    },
    descricao: {
      type: String,
      trim: true,
      maxlength: [1000, "Descrição muito longa"],
    },
    completa: {
      type: Boolean,
      default: false,
    },
    prioridade: {
      type: String,
      enum: ["baixa", "media", "alta"],
      default: "media",
    },
    tags: [
      {
        type: String,
      },
    ],
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    dataPrazo: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tarefa", tarefaSchema);
```

---

## 📌 Slide 6: Backend - Auth Controller

### Controller de Autenticação

```javascript
// filepath: backend/src/controllers/authController.js
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const gerarToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/registrar
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const usuario = await Usuario.create({ nome, email, senha });
    const token = gerarToken(usuario._id);

    res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      token,
      usuario,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email }).select("+senha");
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = gerarToken(usuario._id);

    res.json({
      mensagem: "Login realizado!",
      token,
      usuario,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /api/auth/perfil
exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    res.json({ usuario });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
```

### Middleware Auth

```javascript
// filepath: backend/src/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ erro: "Acesso negado. Token não fornecido." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado." });
  }
};
```

### Rotas de Auth

```javascript
// filepath: backend/src/routes/auth.js
const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/registrar", authController.registrar);
router.post("/login", authController.login);
router.get("/perfil", auth, authController.perfil);

module.exports = router;
```

---

## 📌 Slide 7: Backend - Tarefas Controller

### Controller Completo de Tarefas

```javascript
// filepath: backend/src/controllers/tarefaController.js
const Tarefa = require("../models/Tarefa");

// GET /api/tarefas
exports.listar = async (req, res) => {
  try {
    const { completa, prioridade, busca } = req.query;
    const filtro = { usuario: req.usuarioId };

    if (completa !== undefined) filtro.completa = completa === "true";
    if (prioridade) filtro.prioridade = prioridade;
    if (busca) filtro.titulo = { $regex: busca, $options: "i" };

    const tarefas = await Tarefa.find(filtro).sort({ createdAt: -1 });

    res.json({
      total: tarefas.length,
      tarefas,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /api/tarefas/:id
exports.buscar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findOne({
      _id: req.params.id,
      usuario: req.usuarioId,
    });

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ tarefa });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// POST /api/tarefas
exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, prioridade, tags, dataPrazo } = req.body;

    const tarefa = await Tarefa.create({
      titulo,
      descricao,
      prioridade,
      tags,
      dataPrazo,
      usuario: req.usuarioId,
    });

    res.status(201).json({
      mensagem: "Tarefa criada!",
      tarefa,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// PUT /api/tarefas/:id
exports.atualizar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Tarefa atualizada!", tarefa });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// DELETE /api/tarefas/:id
exports.deletar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuarioId,
    });

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Tarefa deletada!" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
```

### Rotas de Tarefas

```javascript
// filepath: backend/src/routes/tarefas.js
const express = require("express");
const tarefaController = require("../controllers/tarefaController");
const auth = require("../middleware/auth");

const router = express.Router();

// Todas as rotas são protegidas
router.use(auth);

router.get("/", tarefaController.listar);
router.get("/:id", tarefaController.buscar);
router.post("/", tarefaController.criar);
router.put("/:id", tarefaController.atualizar);
router.delete("/:id", tarefaController.deletar);

module.exports = router;
```

---

## 📌 Slide 8: Frontend - Configuração Angular

### Instalações

```bash
cd frontend
ng add @angular/material
npm install @angular/cdk
```

### environments

```typescript
// filepath: frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
};
```

```typescript
// filepath: frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: "https://sua-api.railway.app/api",
};
```

### app.module.ts

```typescript
// filepath: frontend/src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthInterceptor } from "./interceptors/auth.interceptor";

import { LoginPageComponent } from "./pages/login/login.component";
import { RegisterPageComponent } from "./pages/register/register.component";
import { TarefasPageComponent } from "./pages/tarefas/tarefas.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TarefasPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Routing

```typescript
// filepath: frontend/src/app/app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

import { LoginPageComponent } from "./pages/login/login.component";
import { RegisterPageComponent } from "./pages/register/register.component";
import { TarefasPageComponent } from "./pages/tarefas/tarefas.component";

const routes: Routes = [
  { path: "", redirectTo: "/tarefas", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "registrar", component: RegisterPageComponent },
  {
    path: "tarefas",
    component: TarefasPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/tarefas" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

## 📌 Slide 9: Frontend - Models e Services

### Models (Interfaces)

```typescript
// filepath: frontend/src/app/models/usuario.model.ts
export interface Usuario {
  _id: string;
  nome: string;
  email: string;
  avatar?: string;
  ativo: boolean;
  createdAt: Date;
}

export interface AuthResponse {
  mensagem: string;
  token: string;
  usuario: Usuario;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}
```

```typescript
// filepath: frontend/src/app/models/tarefa.model.ts
export type Prioridade = "baixa" | "media" | "alta";

export interface Tarefa {
  _id: string;
  titulo: string;
  descricao?: string;
  completa: boolean;
  prioridade: Prioridade;
  tags: string[];
  dataPrazo?: Date;
  usuario: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CriarTarefaPayload {
  titulo: string;
  descricao?: string;
  prioridade?: Prioridade;
  tags?: string[];
  dataPrazo?: Date;
}

export interface ListaTarefasResponse {
  total: number;
  tarefas: Tarefa[];
}
```

### Auth Service

```typescript
// filepath: frontend/src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  Usuario,
} from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  usuario$ = this.usuarioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.carregarUsuarioSalvo();
  }

  get usuarioAtual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  get isLogado(): boolean {
    return !!localStorage.getItem("token");
  }

  registrar(dados: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/registrar`, dados)
      .pipe(tap((resp) => this.salvarSessao(resp)));
  }

  login(dados: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, dados)
      .pipe(tap((resp) => this.salvarSessao(resp)));
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.usuarioSubject.next(null);
    this.router.navigate(["/login"]);
  }

  private salvarSessao(resp: AuthResponse): void {
    localStorage.setItem("token", resp.token);
    localStorage.setItem("usuario", JSON.stringify(resp.usuario));
    this.usuarioSubject.next(resp.usuario);
  }

  private carregarUsuarioSalvo(): void {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      this.usuarioSubject.next(JSON.parse(usuarioSalvo));
    }
  }
}
```

### Tarefa Service

```typescript
// filepath: frontend/src/app/services/tarefa.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {
  Tarefa,
  CriarTarefaPayload,
  ListaTarefasResponse,
} from "../models/tarefa.model";

@Injectable({
  providedIn: "root",
})
export class TarefaService {
  private apiUrl = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) {}

  listar(filtros?: {
    completa?: boolean;
    prioridade?: string;
    busca?: string;
  }): Observable<ListaTarefasResponse> {
    let params = new HttpParams();
    if (filtros?.completa !== undefined)
      params = params.set("completa", filtros.completa);
    if (filtros?.prioridade)
      params = params.set("prioridade", filtros.prioridade);
    if (filtros?.busca) params = params.set("busca", filtros.busca);

    return this.http.get<ListaTarefasResponse>(this.apiUrl, { params });
  }

  criar(
    dados: CriarTarefaPayload,
  ): Observable<{ mensagem: string; tarefa: Tarefa }> {
    return this.http.post<{ mensagem: string; tarefa: Tarefa }>(
      this.apiUrl,
      dados,
    );
  }

  atualizar(
    id: string,
    dados: Partial<Tarefa>,
  ): Observable<{ mensagem: string; tarefa: Tarefa }> {
    return this.http.put<{ mensagem: string; tarefa: Tarefa }>(
      `${this.apiUrl}/${id}`,
      dados,
    );
  }

  deletar(id: string): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}
```

---

## 📌 Slide 10: Frontend - Interceptor e Guard

### HTTP Interceptor (Adicionar Token nas Requisições)

```typescript
// filepath: frontend/src/app/interceptors/auth.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    // Clonar request e adicionar token
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((erro: HttpErrorResponse) => {
        // Token expirado → redirecionar para login
        if (erro.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          this.router.navigate(["/login"]);
        }
        return throwError(() => erro);
      }),
    );
  }
}
```

### Auth Guard (Proteger Rotas)

```typescript
// filepath: frontend/src/app/guards/auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogado) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
```

---

## 📌 Slide 11: Frontend - Páginas de Auth

### Login Page

```typescript
// filepath: frontend/src/app/pages/login/login.component.ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginPageComponent {
  form: FormGroup;
  loading = false;
  erro = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get("email");
  }
  get senha() {
    return this.form.get("senha");
  }

  login() {
    if (this.form.invalid) return;

    this.loading = true;
    this.erro = "";

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(["/tarefas"]);
      },
      error: (err) => {
        this.erro = err.error?.erro || "Erro ao fazer login";
        this.loading = false;
      },
    });
  }
}
```

```html
<!-- filepath: frontend/src/app/pages/login/login.component.html -->
<div class="auth-container">
  <div class="auth-card">
    <div class="auth-header">
      <h1>📝 TaskApp</h1>
      <p>Faça login para continuar</p>
    </div>

    <form [formGroup]="form" (ngSubmit)="login()">
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          formControlName="email"
          placeholder="seu@email.com"
          [class.invalid]="email?.invalid && email?.touched"
        />
        <span
          class="error-msg"
          *ngIf="email?.errors?.['required'] && email?.touched"
        >
          Email obrigatório
        </span>
        <span
          class="error-msg"
          *ngIf="email?.errors?.['email'] && email?.touched"
        >
          Email inválido
        </span>
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input
          type="password"
          formControlName="senha"
          placeholder="Sua senha"
          [class.invalid]="senha?.invalid && senha?.touched"
        />
        <span
          class="error-msg"
          *ngIf="senha?.errors?.['minlength'] && senha?.touched"
        >
          Mínimo 6 caracteres
        </span>
      </div>

      <div class="erro-global" *ngIf="erro">❌ {{ erro }}</div>

      <button
        type="submit"
        [disabled]="form.invalid || loading"
        class="btn-submit"
      >
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <p class="link-register">
      Não tem conta? <a routerLink="/registrar">Criar conta</a>
    </p>
  </div>
</div>
```

```css
/* filepath: frontend/src/app/pages/login/login.component.css */
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h1 {
  font-size: 2rem;
  color: #333;
}

.auth-header p {
  color: #666;
  margin-top: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.invalid {
  border-color: #e74c3c;
}

.error-msg {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.erro-global {
  background: #fde8e8;
  color: #c0392b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 14px;
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background: #5568d3;
}

.btn-submit:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.link-register {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.link-register a {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}
```

---

## 📌 Slide 12: Frontend - Página de Tarefas

### Componente Principal

```typescript
// filepath: frontend/src/app/pages/tarefas/tarefas.component.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TarefaService } from "../../services/tarefa.service";
import { AuthService } from "../../services/auth.service";
import { Tarefa } from "../../models/tarefa.model";

@Component({
  selector: "app-tarefas",
  templateUrl: "./tarefas.component.html",
  styleUrls: ["./tarefas.component.css"],
})
export class TarefasPageComponent implements OnInit {
  tarefas: Tarefa[] = [];
  loading = false;
  erro = "";
  mostrarForm = false;
  form: FormGroup;
  filtro = "";

  constructor(
    private tarefaService: TarefaService,
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      titulo: ["", [Validators.required, Validators.minLength(3)]],
      descricao: [""],
      prioridade: ["media"],
      dataPrazo: [""],
    });
  }

  ngOnInit() {
    this.carregarTarefas();
  }

  get titulo() {
    return this.form.get("titulo");
  }

  get tarefasFiltradas() {
    return this.tarefas.filter((t) =>
      t.titulo.toLowerCase().includes(this.filtro.toLowerCase()),
    );
  }

  carregarTarefas() {
    this.loading = true;
    this.tarefaService.listar().subscribe({
      next: (resp) => {
        this.tarefas = resp.tarefas;
        this.loading = false;
      },
      error: () => {
        this.erro = "Erro ao carregar tarefas";
        this.loading = false;
      },
    });
  }

  criarTarefa() {
    if (this.form.invalid) return;

    this.tarefaService.criar(this.form.value).subscribe({
      next: (resp) => {
        this.tarefas.unshift(resp.tarefa);
        this.form.reset({ prioridade: "media" });
        this.mostrarForm = false;
      },
      error: () => {
        this.erro = "Erro ao criar tarefa";
      },
    });
  }

  toggleCompleta(tarefa: Tarefa) {
    this.tarefaService
      .atualizar(tarefa._id, { completa: !tarefa.completa })
      .subscribe({
        next: (resp) => {
          const idx = this.tarefas.findIndex((t) => t._id === tarefa._id);
          this.tarefas[idx] = resp.tarefa;
        },
      });
  }

  deletarTarefa(id: string) {
    if (!confirm("Deletar esta tarefa?")) return;

    this.tarefaService.deletar(id).subscribe({
      next: () => {
        this.tarefas = this.tarefas.filter((t) => t._id !== id);
      },
    });
  }

  getPrioridadeClass(prioridade: string): string {
    const classes: Record<string, string> = {
      alta: "prioridade-alta",
      media: "prioridade-media",
      baixa: "prioridade-baixa",
    };
    return classes[prioridade] || "";
  }

  logout() {
    this.authService.logout();
  }
}
```

### Template

```html
<!-- filepath: frontend/src/app/pages/tarefas/tarefas.component.html -->
<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div class="header-content">
      <h1>📝 Minhas Tarefas</h1>
      <div class="header-actions">
        <span class="usuario-nome">
          👤 {{ authService.usuarioAtual?.nome }}
        </span>
        <button (click)="logout()" class="btn-logout">Sair</button>
      </div>
    </div>
  </header>

  <main class="page-main">
    <!-- Barra de ações -->
    <div class="actions-bar">
      <input
        type="text"
        [(ngModel)]="filtro"
        placeholder="🔍 Buscar tarefa..."
        class="search-input"
      />
      <button (click)="mostrarForm = !mostrarForm" class="btn-novo">
        {{ mostrarForm ? '✕ Cancelar' : '+ Nova Tarefa' }}
      </button>
    </div>

    <!-- Formulário Criar Tarefa -->
    <div class="form-card" *ngIf="mostrarForm">
      <h2>Nova Tarefa</h2>
      <form [formGroup]="form" (ngSubmit)="criarTarefa()">
        <div class="form-row">
          <div class="form-group flex-2">
            <label>Título *</label>
            <input
              type="text"
              formControlName="titulo"
              placeholder="Nome da tarefa"
              [class.invalid]="titulo?.invalid && titulo?.touched"
            />
          </div>
          <div class="form-group">
            <label>Prioridade</label>
            <select formControlName="prioridade">
              <option value="baixa">🟢 Baixa</option>
              <option value="media">🟡 Média</option>
              <option value="alta">🔴 Alta</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group flex-2">
            <label>Descrição</label>
            <textarea
              formControlName="descricao"
              placeholder="Descreva a tarefa..."
            ></textarea>
          </div>
          <div class="form-group">
            <label>Data Prazo</label>
            <input type="date" formControlName="dataPrazo" />
          </div>
        </div>

        <button type="submit" [disabled]="form.invalid" class="btn-criar">
          Criar Tarefa
        </button>
      </form>
    </div>

    <!-- Loading -->
    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Carregando tarefas...</p>
    </div>

    <!-- Erro -->
    <div class="erro" *ngIf="erro">❌ {{ erro }}</div>

    <!-- Lista Vazia -->
    <div class="vazio" *ngIf="!loading && tarefasFiltradas.length === 0">
      <p>📭 Nenhuma tarefa encontrada</p>
      <button (click)="mostrarForm = true" class="btn-novo">
        Criar primeira tarefa
      </button>
    </div>

    <!-- Lista de Tarefas -->
    <div class="tarefas-grid" *ngIf="!loading">
      <div
        class="tarefa-card"
        *ngFor="let tarefa of tarefasFiltradas"
        [class.completa]="tarefa.completa"
      >
        <div class="tarefa-header">
          <div class="tarefa-check">
            <input
              type="checkbox"
              [checked]="tarefa.completa"
              (change)="toggleCompleta(tarefa)"
            />
            <span class="tarefa-titulo">{{ tarefa.titulo }}</span>
          </div>
          <span class="badge" [class]="getPrioridadeClass(tarefa.prioridade)">
            {{ tarefa.prioridade }}
          </span>
        </div>

        <p class="tarefa-descricao" *ngIf="tarefa.descricao">
          {{ tarefa.descricao }}
        </p>

        <div class="tarefa-footer">
          <span class="tarefa-data" *ngIf="tarefa.dataPrazo">
            📅 {{ tarefa.dataPrazo | date:'dd/MM/yyyy' }}
          </span>
          <button (click)="deletarTarefa(tarefa._id)" class="btn-deletar">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

## 📌 Slide 13: CORS e Comunicação

### O que é CORS?

Cross-Origin Resource Sharing — politica de segurança do navegador.

### Problema Sem CORS

```
Angular (localhost:4200) → Node.js (localhost:3000)
❌ Blocked by CORS policy!
```

### Solução

```javascript
// filepath: backend/src/server.js
const cors = require("cors");

// Simples (qualquer origem)
app.use(cors());

// Configurado (somente frontend)
app.use(
  cors({
    origin: ["http://localhost:4200", "https://seu-app.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
```

### Fluxo de Requisição com Token

```
1. Angular faz requisição
2. Interceptor adiciona token nos headers
   Authorization: Bearer eyJhbGci...
3. Express recebe e valida token
4. Middleware auth extrai usuarioId
5. Controller busca dados do usuário
6. Retorna resposta para Angular
```

---

## 📌 Slide 14: Deploy Fullstack

### Estratégia

```
Frontend → Netlify / Vercel (gratuito)
Backend  → Railway / Render (gratuito)
Banco    → MongoDB Atlas (gratuito)
```

### Deploy do Backend (Railway)

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Na pasta do backend
railway init
railway up
```

### Deploy do Frontend (Netlify)

```bash
# 1. Build para produção
cd frontend
ng build --configuration production

# 2. Pasta dist/frontend é gerada
# 3. Arraste para app.netlify.com/drop
# ou
npm install -g netlify-cli
netlify deploy --prod --dir=dist/frontend
```

### Variáveis de Ambiente Produção

**Railway (Backend)**

```
PORT=3000
MONGODB_URI=mongodb+srv://...@cluster.mongodb.net/app
JWT_SECRET=chave_super_segura_producao_123
FRONTEND_URL=https://seu-app.netlify.app
```

**Netlify (Frontend)**

```
NG_APP_API_URL=https://seu-backend.railway.app/api
```

### Atualizar Environment Angular

```typescript
// filepath: frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: "https://seu-backend.railway.app/api",
};
```

---

## 📌 Slide 15: Resumo e Próximos Passos

### ✅ Conceitos do Level 8

```
Backend (Node.js + Express)
├── Models (Mongoose)
├── Controllers (lógica)
├── Routes (endpoints)
├── Middleware (auth, validação)
└── JWT (autenticação)

Frontend (Angular)
├── Models (interfaces)
├── Services (HTTP)
├── Components + Pages
├── Interceptors (token)
├── Guards (proteção)
└── Routing (navegação)

Integração
├── CORS configurado
├── Token JWT no header
├── Interceptor automático
├── Tratamento de erros
└── Deploy separado
```

### ✅ Boas Práticas Fullstack

- ✅ Nunca expor dados sensíveis
- ✅ Validar no frontend E backend
- ✅ Tratar erros em ambos os lados
- ✅ Usar variáveis de ambiente
- ✅ Autenticação JWT
- ✅ CORS configurado corretamente
- ✅ Loading states na UI
- ✅ Feedback ao usuário sempre

### ❌ O que Evitar

- ❌ Lógica de negócio no frontend
- ❌ Senha sem hash
- ❌ Token no código
- ❌ CORS aberto em produção (`*`)
- ❌ Sem tratamento de erros HTTP
- ❌ Sem loading states

---

## 🎯 Resumo Final - Level 8

**Fullstack cobre:**

- ✅ Backend com Node.js + Express
- ✅ Frontend com Angular
- ✅ Autenticação JWT completa
- ✅ CRUD integrado ponta a ponta
- ✅ Interceptors e Guards
- ✅ Deploy frontend + backend

**Você agora pode criar:**

- ✅ Aplicações web completas
- ✅ Sistemas com login/autenticação
- ✅ APIs consumidas pelo Angular
- ✅ Apps prontos para produção

**Parabéns! Você é um desenvolvedor Fullstack!** 🚀🎉

---

## 💡 O que vem depois?

```
Level 9  → DevOps (Docker, CI/CD)
Level 10 → Cloud (AWS, GCP, Azure)
Level 11 → Testes automatizados
Level 12 → Arquitetura avançada
```

**Continue evoluindo!** 🔥
