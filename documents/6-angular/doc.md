# 🅰️ Level 6 — Angular

## Objetivo

Dominar o framework Angular para criar **Single Page Applications (SPAs)** escaláveis

---

## 📌 Slide 1: O que é Angular?

### Angular

Framework JavaScript mantido pelo **Google** para construir aplicações web modernas.

### Características

- ✅ **Full-featured** - Tudo integrado (routing, forms, HTTP)
- ✅ **TypeScript** - Tipagem estática
- ✅ **RxJS** - Programação reativa
- ✅ **CLI poderosa** - Angular CLI
- ✅ **Escalável** - Para grandes projetos
- ✅ **Bem estruturado** - Padrão (componentes, serviços)

### Angular vs React vs Vue

| Feature           | Angular      | React          | Vue         |
| ----------------- | ------------ | -------------- | ----------- |
| Tipo              | Framework    | Biblioteca     | Framework   |
| Linguagem         | TypeScript   | JavaScript     | JavaScript  |
| Curva aprendizado | Steep        | Gradual        | Suave       |
| Tamanho           | Grande       | Pequeno        | Pequeno     |
| Ideal para        | Grandes apps | Qualquer coisa | Médias apps |

### Analogia

```
HTML    = Estrutura
CSS     = Estilo
Angular = Aplicação completa (estrutura + lógica + roteamento)
```

---

## 📌 Slide 2: SPA - Single Page Application

### O que é SPA?

Aplicação que carrega **uma única página HTML** e atualiza dinamicamente via JavaScript.

### Fluxo SPA vs MPA

**MPA (Multi Page Application)** - Tradicional

```
User → Click → Request → Server → Load HTML → Render → Display
(mais lento, recarrega página)
```

**SPA (Single Page Application)** - Moderno

```
First Load → All JS/assets → User interactions → Update DOM → Display
(mais rápido, sem recarregar)
```

### Benefícios SPA

- ⚡ Mais rápido (não recarrega página)
- 📱 Experiência tipo app nativo
- 🔄 Transições suaves
- 💾 Cache eficiente

### Tecnologias SPA

- Angular ✅
- React ✅
- Vue ✅
- Svelte ✅

---

## 📌 Slide 3: Setup Inicial - Angular CLI

### Instalar Angular CLI

```bash
npm install -g @angular/cli
```

### Criar novo projeto

```bash
ng new meu-app
cd meu-app
```

### Estrutura do projeto

```
meu-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts         # Componente raiz
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts             # Módulo principal
│   ├── index.html
│   ├── styles.css                    # Estilos globais
│   └── main.ts                       # Ponto de entrada
├── angular.json                      # Configuração
├── package.json
└── tsconfig.json                     # Configuração TypeScript
```

### Rodar projeto

```bash
ng serve
# ou
npm start
```

Acesse: `http://localhost:4200`

---

## 📌 Slide 4: TypeScript Basics

### O que é TypeScript?

Superset do JavaScript que adiciona **tipagem estática**.

### Tipos Básicos

```typescript
// string
let nome: string = "João";

// number
let idade: number = 28;

// boolean
let ativo: boolean = true;

// array
let numeros: number[] = [1, 2, 3];
let nomes: Array<string> = ["João", "Maria"];

// any (evitar)
let valor: any = "pode ser qualquer coisa";

// union types
let id: string | number = 123;

// null/undefined
let vazio: null = null;
let indefinido: undefined = undefined;
```

### Interfaces

```typescript
interface Usuario {
  nome: string;
  email: string;
  idade?: number; // Opcional
}

const usuario: Usuario = {
  nome: "João",
  email: "joao@email.com",
};
```

### Classes

```typescript
class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): string {
    return `Olá, meu nome é ${this.nome}`;
  }
}

const pessoa = new Pessoa("João", 28);
console.log(pessoa.apresentar());
```

---

## 📌 Slide 5: Componentes

### O que são Componentes?

Blocos reutilizáveis que encapsulam **template**, **lógica** e **estilos**.

### Criar Componente

```bash
ng generate component componentes/header
# Abreviado:
ng g c componentes/header
```

### Estrutura de Componente

```typescript
<!-- filepath: header.component.ts -->
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',           // Nome HTML
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titulo = 'Meu App Angular';
  usuario = 'João Developer';

  saudacao() {
    alert(`Bem-vindo, ${this.usuario}!`);
  }
}
```

### Template

```html
<!-- filepath: header.component.html -->
<header>
  <h1>{{ titulo }}</h1>
  <p>Usuário: {{ usuario }}</p>
  <button (click)="saudacao()">Saudar</button>
</header>
```

### Estilos

```css
/* filepath: header.component.css */
header {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
}
```

### Usar Componente

```html
<!-- em outro template -->
<app-header></app-header>
```

---

## 📌 Slide 6: Data Binding

### Interpolation ({{ }})

Mostra valor da variável no template

```typescript
// Componente
export class HomeComponent {
  nome = "João";
  contador = 0;
}
```

```html
<!-- Template -->
<p>Olá, {{ nome }}!</p>
<p>Cliques: {{ contador }}</p>
<p>{{ 2 + 2 }}</p>
```

### Property Binding ([])

Atribui valor a propriedade HTML

```html
<!-- Bind a valor -->
<img [src]="imagemUrl" [alt]="descricao" />
<button [disabled]="botaoDesativado">Clique</button>
<div [class.ativo]="isAtivo"></div>
<div [style.color]="corTexto"></div>
```

```typescript
export class ImagemComponent {
  imagemUrl = "https://example.com/imagem.jpg";
  descricao = "Minha imagem";
  botaoDesativado = false;
  isAtivo = true;
  corTexto = "red";
}
```

### Event Binding (())

Escuta eventos HTML

```html
<button (click)="incrementar()">Incrementar</button>
<input (input)="onInput($event)" placeholder="Digite algo" />
<form (submit)="enviar($event)">
  <button type="submit">Enviar</button>
</form>
```

```typescript
export class FormComponent {
  contador = 0;
  texto = "";

  incrementar() {
    this.contador++;
  }

  onInput(event: any) {
    this.texto = event.target.value;
  }

  enviar(event: Event) {
    event.preventDefault();
    console.log("Enviado:", this.texto);
  }
}
```

### Two-Way Binding ([()])

Sincroniza dado entre template e componente

```html
<input [(ngModel)]="nome" placeholder="Seu nome" />
<p>Você digitou: {{ nome }}</p>
```

```typescript
export class BindingComponent {
  nome = "";
}
```

---

## 📌 Slide 7: Diretivas

### ngIf

Renderiza elemento condicionalmente

```html
<div *ngIf="logado">
  <p>Bem-vindo, {{ nome }}!</p>
</div>

<div *ngIf="logado; else semLogin">
  <p>Logado como {{ nome }}</p>
</div>
<ng-template #semLogin>
  <p>Você não está logado</p>
</ng-template>

<!-- ngIf + ngElse + ngElseIf -->
<div *ngIf="status === 'admin'">Admin</div>
<div *ngIf="status === 'user'; else naoUser">User</div>
<ng-template #naoUser>
  <div>Não é user</div>
</ng-template>
```

### ngFor

Ativa loop sobre array/objeto

```html
<!-- Loop simples -->
<ul>
  <li *ngFor="let tarefa of tarefas">{{ tarefa }}</li>
</ul>

<!-- Com índice -->
<div *ngFor="let item of items; let i = index">{{ i + 1 }}. {{ item }}</div>

<!-- Com track by (performance) -->
<div *ngFor="let usuario of usuarios; trackBy: trackByUserId">
  {{ usuario.nome }}
</div>
```

```typescript
export class ListComponent {
  tarefas = ["Aprender Angular", "Fazer projeto", "Deploy"];

  usuarios = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
  ];

  trackByUserId(index: number, usuario: any) {
    return usuario.id;
  }
}
```

### ngClass

Aplica classes CSS dinamicamente

```html
<!-- Uma classe -->
<div [ngClass]="{'ativo': isAtivo}">Div ativa</div>

<!-- Múltiplas -->
<div [ngClass]="{'ativo': isAtivo, 'disabled': isDesabilitado}">
  Status dinâmico
</div>

<!-- Objeto de classes -->
<div [ngClass]="classObject">Classes do objeto</div>
```

```typescript
export class ClassComponent {
  isAtivo = true;
  isDesabilitado = false;

  classObject = {
    "text-danger": false,
    "text-success": true,
    "text-warning": false,
  };
}
```

### ngStyle

Aplica estilos CSS dinamicamente

```html
<div [ngStyle]="{'color': corTexto, 'font-size': tamanho}">
  Texto estilizado
</div>

<!-- Com condição -->
<div [ngStyle]="{'background': isAtivo ? 'green' : 'red'}">Fundo dinâmico</div>

<!-- Com objeto -->
<div [ngStyle]="estilosObjeto">Estilos do objeto</div>
```

```typescript
export class StyleComponent {
  corTexto = "blue";
  tamanho = "20px";
  isAtivo = true;

  estilosObjeto = {
    color: "white",
    "background-color": "#333",
    padding: "20px",
  };
}
```

---

## 📌 Slide 8: Services e Injeção de Dependência

### O que são Services?

Classes que encapsulam **lógica de negócio** reutilizável.

### Criar Service

```bash
ng generate service services/tarefa
# Abreviado:
ng g s services/tarefa
```

### Exemplo Service

```typescript
<!-- filepath: services/tarefa.service.ts -->
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Disponível em toda app
})
export class TarefaService {
  private tarefas = [
    { id: 1, titulo: "Tarefa 1", completa: false },
    { id: 2, titulo: "Tarefa 2", completa: true }
  ];

  constructor() { }

  getTarefas() {
    return this.tarefas;
  }

  addTarefa(titulo: string) {
    const novaTarefa = {
      id: this.tarefas.length + 1,
      titulo,
      completa: false
    };
    this.tarefas.push(novaTarefa);
  }

  deleteTarefa(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }

  completarTarefa(id: number) {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (tarefa) {
      tarefa.completa = !tarefa.completa;
    }
  }
}
```

### Usar Service no Componente

```typescript
<!-- filepath: tarefas.component.ts -->
import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas: any[] = [];
  novaTarefa = '';

  // Injetar service no construtor
  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    // Carregar tarefas ao iniciar
    this.tarefas = this.tarefaService.getTarefas();
  }

  adicionarTarefa() {
    if (this.novaTarefa.trim()) {
      this.tarefaService.addTarefa(this.novaTarefa);
      this.tarefas = this.tarefaService.getTarefas();
      this.novaTarefa = '';
    }
  }

  deletarTarefa(id: number) {
    this.tarefaService.deleteTarefa(id);
    this.tarefas = this.tarefaService.getTarefas();
  }

  completarTarefa(id: number) {
    this.tarefaService.completarTarefa(id);
  }
}
```

### Template

```html
<!-- filepath: tarefas.component.html -->
<div class="tarefas">
  <h1>Minhas Tarefas</h1>

  <div class="input-group">
    <input
      [(ngModel)]="novaTarefa"
      placeholder="Nova tarefa..."
      (keyup.enter)="adicionarTarefa()"
    />
    <button (click)="adicionarTarefa()">Adicionar</button>
  </div>

  <ul>
    <li *ngFor="let tarefa of tarefas" [class.completa]="tarefa.completa">
      <input
        type="checkbox"
        [checked]="tarefa.completa"
        (change)="completarTarefa(tarefa.id)"
      />
      <span>{{ tarefa.titulo }}</span>
      <button (click)="deletarTarefa(tarefa.id)" class="delete">Deletar</button>
    </li>
  </ul>
</div>
```

---

## 📌 Slide 9: Routing

### Criar rutas

```typescript
<!-- filepath: app-routing.module.ts -->
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },          // /
  { path: 'sobre', component: SobreComponent },    // /sobre
  { path: 'contato', component: ContatoComponent }, // /contato
  { path: '**', component: NotFoundComponent }     // Tudo mais (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### `<router-outlet>`

Placeholder onde as rotas são renderizadas

```html
<!-- filepath: app.component.html -->
<header>
  <nav>
    <a routerLink="/" class="nav-link">Home</a>
    <a routerLink="/sobre" class="nav-link">Sobre</a>
    <a routerLink="/contato" class="nav-link">Contato</a>
  </nav>
</header>

<!-- Componente da rota renderiza aqui -->
<main>
  <router-outlet></router-outlet>
</main>

<footer>
  <p>&copy; 2026</p>
</footer>
```

### Navegação Programática

```typescript
import { Router } from "@angular/router";

export class BotaoComponent {
  constructor(private router: Router) {}

  navegar() {
    this.router.navigate(["/sobre"]);
  }

  navegarComParametros() {
    this.router.navigate(["/usuario", 123]);
  }
}
```

### Rotas Parametrizadas

```typescript
// Define rota com parâmetro
const routes: Routes = [{ path: "usuario/:id", component: UsuarioComponent }];
```

```typescript
// Acessar parâmetro
import { ActivatedRoute } from "@angular/router";

export class UsuarioComponent implements OnInit {
  usuarioId: string | null = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get("id");
  }
}
```

---

## 📌 Slide 10: HTTP - Consumir APIs

### HttpClient

Realizar requisições HTTP

```typescript
<!-- filepath: usuario.service.ts -->
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://api.example.com/usuarios';

  constructor(private http: HttpClient) { }

  // GET - Buscar todos
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // GET - Buscar um
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // POST - Criar
  criarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // PUT - Atualizar
  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE - Deletar
  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### Usar Service no Componente

```typescript
<!-- filepath: usuarios.component.ts -->
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  loading = false;
  erro = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.loading = true;
    this.erro = '';

    this.usuarioService.getUsuarios().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro:', erro);
        this.erro = 'Falha ao carregar usuários';
        this.loading = false;
      }
    });
  }

  deletarUsuario(id: number) {
    if (confirm('Tem certeza?')) {
      this.usuarioService.deletarUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== id);
        },
        error: (erro) => {
          this.erro = 'Erro ao deletar';
        }
      });
    }
  }
}
```

### Importar HttpClientModule

```typescript
<!-- filepath: app.module.ts -->
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AppModule { }
```

---

## 📌 Slide 11: Forms - Template Forms

### Template Forms (Simples)

Validação no template com ngModel

```html
<!-- filepath: formulario.component.html -->
<form #form="ngForm" (ngSubmit)="enviar(form)">
  <div class="form-group">
    <label>Nome:</label>
    <input
      type="text"
      name="nome"
      ngModel
      required
      #nome="ngModelControl"
      [class.error]="nome.invalid && nome.touched"
    />
    <span *ngIf="nome.errors?.['required']" class="error-msg">
      Nome é obrigatório
    </span>
  </div>

  <div class="form-group">
    <label>Email:</label>
    <input
      type="email"
      name="email"
      ngModel
      required
      email
      #email="ngModelControl"
    />
    <span *ngIf="email.invalid && email.touched" class="error-msg">
      Email inválido
    </span>
  </div>

  <div class="form-group">
    <label>Mensagem:</label>
    <textarea
      name="mensagem"
      ngModel
      required
      minlength="10"
      #mensagem="ngModelControl"
    ></textarea>
    <span *ngIf="mensagem.errors?.['minlength']" class="error-msg">
      Mínimo 10 caracteres
    </span>
  </div>

  <button type="submit" [disabled]="form.invalid">Enviar</button>
</form>
```

```typescript
<!-- filepath: formulario.component.ts -->
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  enviar(form: NgForm) {
    if (form.valid) {
      console.log('Dados:', form.value);
      // Enviar para servidor
      form.reset();
    }
  }
}
```

---

## 📌 Slide 12: Forms - Reactive Forms

### Reactive Forms (Avançado)

Validação programática com FormBuilder

```typescript
<!-- filepath: contato.component.ts -->
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get nome() {
    return this.contatoForm.get('nome');
  }

  get email() {
    return this.contatoForm.get('email');
  }

  get assunto() {
    return this.contatoForm.get('assunto');
  }

  get mensagem() {
    return this.contatoForm.get('mensagem');
  }

  enviar() {
    if (this.contatoForm.valid) {
      console.log('Enviado:', this.contatoForm.value);
      this.contatoForm.reset();
    }
  }
}
```

```html
<!-- filepath: contato.component.html -->
<form [formGroup]="contatoForm" (ngSubmit)="enviar()">
  <div class="form-group">
    <label>Nome:</label>
    <input
      type="text"
      formControlName="nome"
      [class.error]="nome?.invalid && nome?.touched"
    />
    <span *ngIf="nome?.errors?.['required']" class="error-msg">
      Nome obrigatório
    </span>
    <span *ngIf="nome?.errors?.['minlength']" class="error-msg">
      Mínimo 3 caracteres
    </span>
  </div>

  <div class="form-group">
    <label>Email:</label>
    <input
      type="email"
      formControlName="email"
      [class.error]="email?.invalid && email?.touched"
    />
    <span *ngIf="email?.errors?.['email']" class="error-msg">
      Email inválido
    </span>
  </div>

  <div class="form-group">
    <label>Assunto:</label>
    <input type="text" formControlName="assunto" />
  </div>

  <div class="form-group">
    <label>Mensagem:</label>
    <textarea
      formControlName="mensagem"
      [class.error]="mensagem?.invalid && mensagem?.touched"
    ></textarea>
  </div>

  <button type="submit" [disabled]="contatoForm.invalid" class="btn-submit">
    Enviar
  </button>
</form>
```

---

## 📌 Slide 13: Projeto - Sistema de Tarefas (CRUD)

### Estrutura do Projeto

```
src/app/
├── components/
│   ├── header/
│   ├── footer/
│   └── tarefa-form/
├── pages/
│   ├── home/
│   ├── tarefas/
│   └── editar-tarefa/
├── services/
│   └── tarefa.service.ts
├── models/
│   └── tarefa.model.ts
├── app.component.*
├── app.module.ts
└── app-routing.module.ts
```

### Model

```typescript
<!-- filepath: models/tarefa.model.ts -->
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  completa: boolean;
  dataCriacao: Date;
}
```

### Service Completo

```typescript
<!-- filepath: services/tarefa.service.ts -->
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'https://api.example.com/tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  getTarefa(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  criarTarefa(tarefa: Omit<Tarefa, 'id'>): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  atualizarTarefa(id: number, tarefa: Partial<Tarefa>): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  deletarTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  completarTarefa(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}`, { completa: true });
  }
}
```

### Componente Listar Tarefas

```typescript
<!-- filepath: pages/tarefas/tarefas.component.ts -->
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  loading = false;
  erro = '';

  constructor(
    private tarefaService: TarefaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.loading = true;
    this.erro = '';

    this.tarefaService.getTarefas().subscribe({
      next: (dados) => {
        this.tarefas = dados;
        this.loading = false;
      },
      error: (erro) => {
        this.erro = 'Erro ao carregar tarefas';
        this.loading = false;
      }
    });
  }

  editarTarefa(id: number) {
    this.router.navigate(['/editar', id]);
  }

  deletarTarefa(id: number) {
    if (confirm('Deseja deletar esta tarefa?')) {
      this.tarefaService.deletarTarefa(id).subscribe({
        next: () => {
          this.tarefas = this.tarefas.filter(t => t.id !== id);
        },
        error: () => {
          this.erro = 'Erro ao deletar tarefa';
        }
      });
    }
  }

  completarTarefa(tarefa: Tarefa) {
    this.tarefaService.completarTarefa(tarefa.id).subscribe({
      next: (tarefaAtualizada) => {
        const index = this.tarefas.findIndex(t => t.id === tarefaAtualizada.id);
        this.tarefas[index] = tarefaAtualizada;
      }
    });
  }
}
```

### Template Listar Tarefas

```html
<!-- filepath: pages/tarefas/tarefas.component.html -->
<div class="tarefas-container">
  <h1>Minhas Tarefas</h1>

  <button [routerLink]="['/criar']" class="btn-novo">+ Nova Tarefa</button>

  <div *ngIf="loading" class="loading">Carregando...</div>

  <div *ngIf="erro" class="erro">{{ erro }}</div>

  <div *ngIf="!loading && tarefas.length === 0" class="vazio">
    Nenhuma tarefa ainda. <a [routerLink]="['/criar']">Criar uma!</a>
  </div>

  <table *ngIf="!loading && tarefas.length > 0" class="tarefas-tabela">
    <thead>
      <tr>
        <th></th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let tarefa of tarefas" [class.completa]="tarefa.completa">
        <td>
          <input
            type="checkbox"
            [checked]="tarefa.completa"
            (change)="completarTarefa(tarefa)"
          />
        </td>
        <td>{{ tarefa.titulo }}</td>
        <td>{{ tarefa.descricao }}</td>
        <td class="acoes">
          <button (click)="editarTarefa(tarefa.id)" class="btn-editar">
            Editar
          </button>
          <button (click)="deletarTarefa(tarefa.id)" class="btn-deletar">
            Deletar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### CSS

```css
<!-- filepath: pages/tarefas/tarefas.component.css -->
.tarefas-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.btn-novo {
  background: #667eea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.3s;
}

.btn-novo:hover {
  background: #5568d3;
}

.loading,
.vazio {
  text-align: center;
  padding: 40px;
  color: #666;
}

.erro {
  background: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.tarefas-tabela {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.tarefas-tabela thead {
  background: #f5f5f5;
  border-bottom: 2px solid #ddd;
}

.tarefas-tabela th {
  padding: 15px;
  text-align: left;
  font-weight: bold;
  color: #333;
}

.tarefas-tabela td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.tarefas-tabela tr.completa {
  opacity: 0.6;
}

.tarefas-tabela tr.completa td {
  text-decoration: line-through;
}

.acoes {
  display: flex;
  gap: 10px;
}

.btn-editar,
.btn-deletar {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-editar {
  background: #4caf50;
  color: white;
}

.btn-editar:hover {
  background: #45a049;
}

.btn-deletar {
  background: #f44336;
  color: white;
}

.btn-deletar:hover {
  background: #da190b;
}
```

---

## 📌 Slide 14: Resumo - Checklist

### ✅ Conceitos Aprendidos

- ✅ Estrutura Angular
- ✅ TypeScript basics
- ✅ Componentes (criar, usar, comunicação)
- ✅ Data binding (interpolation, property, event, two-way)
- ✅ Diretivas (ngIf, ngFor, ngClass, ngStyle)
- ✅ Services e injeção de dependência
- ✅ Routing e navegação
- ✅ HttpClient (requisições)
- ✅ Forms (template e reactive)
- ✅ Projeto CRUD completo

### ✅ Boas Práticas

- ✅ Separar componentes e services
- ✅ Usar interfaces para tipagem
- ✅ Tratamento de erros
- ✅ OnInit lifecycle hook
- ✅ Unsubscribe de observables
- ✅ Validação de formulários
- ✅ Nomes descritivos

### ❌ O que Evitar

- ❌ Lógica no template
- ❌ Variáveis globais
- ❌ Não tratar erros HTTP
- ❌ Não usar trackBy em ngFor
- ❌ Memory leaks (esquecer unsubscribe)
- ❌ Componentes muito grandes

---

## 📌 Slide 15: Dicas e Recursos

### RxJS Operators Comuns

```typescript
import { map, catchError, filter } from "rxjs/operators";

this.usuarioService
  .getUsuarios()
  .pipe(
    map((usuarios) => usuarios.filter((u) => u.ativo)),
    catchError((erro) => {
      console.error(erro);
      return [];
    }),
  )
  .subscribe((usuarios) => {
    this.usuarios = usuarios;
  });
```

### Unsubscribe automático

```typescript
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export class MeuComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.dados$.pipe(takeUntil(this.destroy$)).subscribe((dados) => {
      // ...
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Ferramentas Úteis

- **Angular DevTools** - Extension para Chrome
- **ng g** - Gerador de componentes
- **ng serve** - Servidor de desenvolvimento
- **ng build** - Build para produção
- **Postman** - Testar APIs

### Documentação

- Angular Docs: https://angular.io/docs
- TypeScript: https://www.typescriptlang.org
- RxJS: https://rxjs.dev
- Material Design: https://material.angular.io

---

## 🎯 Próximos Passos

### Após dominar Level 6:

1. ✅ Aprender **Angular Material** (componentes UI)
2. ✅ Implementar **autenticação JWT**
3. ✅ Usar **Interceptors** para HTTP
4. ✅ Implementar **Guards** (proteção de rotas)
5. ✅ Estudar **RxJS avançado**
6. ✅ Deploy na nuvem

### Projeto Final Sugerido

**Sistema de Gerenciamento Financeiro:**

- ✅ Login/Register
- ✅ CRUD de transações
- ✅ Dashboard com gráficos
- ✅ Filtros e buscas
- ✅ Relatórios

---

## 🚀 Resumo Final

**Level 6 (Angular) cobre:**

- ✅ Framework completo
- ✅ Architecture escalável
- ✅ TypeScript avançado
- ✅ RxJS e Observables
- ✅ Projeto CRUD funcional

**Você agora pode:**

- ✅ Criar SPAs profissionais
- ✅ Consumir APIs
- ✅ Trabalhar com formulários
- ✅ Implementar routing
- ✅ Trabalhar em equipe

**Parabéns!** Você domina **frontened com Angular**! 🎉

---

## 💡 Motivação Final

Angular é poderoso e cada conceito que você aprendeu é essencial para construir aplicações web modernas e escaláveis. Continue praticando, criando projetos e aprofundando seus conhecimentos!

**O futuro é SPA!** 🚀✨
