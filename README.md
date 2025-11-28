# 📝 Sistema de Gerenciamento de Tarefas

Sistema completo de gerenciamento de tarefas desenvolvido com arquitetura de microsserviços utilizando Docker Compose. A aplicação permite criar, listar, atualizar e excluir tarefas através de uma interface web intuitiva.

## 📋 Descrição do Sistema

Este projeto implementa um sistema CRUD completo para gerenciamento de tarefas, composto por três serviços containerizados:

- **Frontend**: Interface web desenvolvida em React que permite ao usuário interagir com o sistema
- **Backend**: API REST desenvolvida em Node.js + Express que gerencia a lógica de negócio
- **Banco de Dados**: PostgreSQL para persistência dos dados

### Funcionalidades

- ✅ Criar novas tarefas com título e descrição
- ✅ Listar todas as tarefas cadastradas
- ✅ Marcar tarefas como concluídas/pendentes
- ✅ Excluir tarefas
- ✅ Interface responsiva e intuitiva
- ✅ Persistência de dados em banco PostgreSQL

## 🏗️ Arquitetura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   Frontend      │─────▶│    Backend      │─────▶│   PostgreSQL    │
│   (React)       │      │   (Node.js)     │      │   (Database)    │
│   Porta: 3000   │      │   Porta: 5000   │      │   Porta: 5432   │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## 🔧 Tecnologias Utilizadas

### Frontend
- React 18.2
- Axios (requisições HTTP)
- CSS3 (estilização)
- Nginx (servidor web)

### Backend
- Node.js 18
- Express 4.18
- PostgreSQL Driver (pg)
- CORS

### Banco de Dados
- PostgreSQL 15

### Infraestrutura
- Docker
- Docker Compose
- Multi-stage builds

## 📦 Estrutura do Projeto

```
.
├── docker-compose.yml          # Orquestração dos serviços
├── init.sql                    # Script de inicialização do banco
├── README.md                   # Documentação do projeto
├── backend/
│   ├── Dockerfile             # Imagem do backend
│   ├── package.json           # Dependências do Node.js
│   └── server.js              # Código da API REST
└── frontend/
    ├── Dockerfile             # Imagem do frontend (multi-stage)
    ├── nginx.conf             # Configuração do Nginx
    ├── package.json           # Dependências do React
    ├── public/
    │   └── index.html        # HTML base
    └── src/
        ├── App.js            # Componente principal
        ├── App.css           # Estilos da aplicação
        ├── index.js          # Ponto de entrada React
        └── index.css         # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos

- Docker (versão 20.10 ou superior)
- Docker Compose (versão 2.0 ou superior)

### Instruções de Execução

1. **Clone o repositório** (ou extraia os arquivos):

```bash
git clone <seu-repositorio>
cd <pasta-do-projeto>
```

2. **Execute o Docker Compose**:

```bash
docker compose up
```

Ou, para executar em segundo plano:

```bash
docker compose up -d
```

3. **Aguarde a inicialização** dos serviços (pode levar alguns minutos na primeira vez)

4. **Acesse a aplicação**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Banco de dados: localhost:5432

### Comandos Úteis

```bash
# Parar os serviços
docker compose down

# Parar e remover volumes (limpa o banco de dados)
docker compose down -v

# Ver logs dos serviços
docker compose logs

# Ver logs de um serviço específico
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Reconstruir as imagens
docker compose build

# Reconstruir e iniciar
docker compose up --build
```

## 🌐 Serviços e Portas

| Serviço   | Porta | URL de Acesso            | Descrição                     |
|-----------|-------|--------------------------|-------------------------------|
| Frontend  | 3000  | http://localhost:3000    | Interface web da aplicação    |
| Backend   | 5000  | http://localhost:5000    | API REST                      |
| Database  | 5432  | localhost:5432           | PostgreSQL                    |

## 🔌 Endpoints da API

### Health Check
```http
GET /api/health
```

**Resposta de sucesso:**
```json
{
  "status": "ok",
  "message": "API funcionando corretamente"
}
```

### Listar Tarefas
```http
GET /api/tasks
```

**Resposta de sucesso:**
```json
[
  {
    "id": 1,
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "completed": false,
    "created_at": "2025-11-27T10:30:00.000Z",
    "updated_at": "2025-11-27T10:30:00.000Z"
  }
]
```

### Buscar Tarefa por ID
```http
GET /api/tasks/:id
```

### Criar Nova Tarefa
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Nova tarefa",
  "description": "Descrição opcional"
}
```

**Resposta de sucesso:**
```json
{
  "id": 5,
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false,
  "created_at": "2025-11-27T10:30:00.000Z",
  "updated_at": "2025-11-27T10:30:00.000Z"
}
```

### Atualizar Tarefa
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Título atualizado",
  "description": "Nova descrição",
  "completed": true
}
```

### Excluir Tarefa
```http
DELETE /api/tasks/:id
```

**Resposta de sucesso:**
```json
{
  "message": "Tarefa excluída com sucesso",
  "task": { ... }
}
```

## 🧪 Testando a Aplicação

### Teste via Interface Web

1. Acesse http://localhost:3000
2. Preencha o formulário para criar uma nova tarefa
3. Visualize a tarefa criada na lista
4. Marque/desmarque o checkbox para alterar o status
5. Clique no ícone da lixeira para excluir

### Teste via API (usando curl)

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Listar tarefas:**
```bash
curl http://localhost:5000/api/tasks
```

**Criar tarefa:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Teste via curl", "description": "Testando a API"}'
```

**Atualizar tarefa (marcar como concluída):**
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Excluir tarefa:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## 🔐 Variáveis de Ambiente

### Backend
- `NODE_ENV`: Ambiente de execução (production)
- `DB_HOST`: Host do banco de dados (db)
- `DB_PORT`: Porta do PostgreSQL (5432)
- `DB_USER`: Usuário do banco (taskuser)
- `DB_PASSWORD`: Senha do banco (taskpass123)
- `DB_NAME`: Nome do banco (tasksdb)
- `PORT`: Porta do servidor backend (5000)

### Frontend
- `REACT_APP_API_URL`: URL da API backend (http://localhost:5000)

### Database
- `POSTGRES_USER`: Usuário do PostgreSQL (taskuser)
- `POSTGRES_PASSWORD`: Senha do PostgreSQL (taskpass123)
- `POSTGRES_DB`: Nome do banco de dados (tasksdb)

## 💾 Persistência de Dados

O banco de dados PostgreSQL utiliza um volume Docker nomeado (`postgres_data`) para garantir a persistência dos dados mesmo após reinicialização dos contêineres.

Para limpar completamente os dados:
```bash
docker compose down -v
```

## 🐛 Troubleshooting

### Portas já em uso
Se alguma porta estiver em uso, você pode alterá-las no `docker-compose.yml`:

```yaml
ports:
  - "3001:80"    # Muda frontend para porta 3001
  - "5001:5000"  # Muda backend para porta 5001
```

### Erro de conexão com banco de dados
- Verifique se o contêiner do banco está rodando: `docker compose ps`
- Aguarde alguns segundos para o banco inicializar completamente
- Verifique os logs: `docker compose logs db`

### Erro ao construir imagens
- Limpe o cache do Docker: `docker system prune -a`
- Reconstrua as imagens: `docker compose build --no-cache`

### Frontend não carrega dados
- Verifique se a variável `REACT_APP_API_URL` está correta
- Verifique se o backend está acessível: `curl http://localhost:5000/api/health`
- Verifique os logs do frontend: `docker compose logs frontend`

---

**Data de criação:** Novembro/2025  

**Versão:** 1.0.0
