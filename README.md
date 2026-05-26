# Teste TMB — Sistema de Gestão de Pedidos

API REST para gerenciamento de pedidos com processamento assíncrono via Worker, frontend em React e banco de dados PostgreSQL.

---

## Tecnologias

**Backend**
- .NET 10
- Entity Framework Core 9 + Npgsql (PostgreSQL)
- ASP.NET Core Web API

**Frontend**
- React + Vite
- Tailwind CSS

**Infraestrutura**
- PostgreSQL (Docker)
- Docker Compose (estrutura preparada)

---

## Arquitetura

O projeto segue uma **arquitetura em camadas**:

```
Controller  →  recebe requisições HTTP
Service     →  regras de negócio
Repository  →  acesso ao banco via EF Core
Worker      →  processamento assíncrono em background
```

---

## Endpoints

| Método | Rota           | Descrição              |
|--------|----------------|------------------------|
| POST   | /orders        | Criar novo pedido      |
| GET    | /orders        | Listar todos os pedidos|
| GET    | /orders/{id}   | Detalhes do pedido     |

---

## Modelo de Pedido

```json
{
  "id": "uuid",
  "cliente": "string",
  "produto": "string",
  "valor": 0.00,
  "status": "Pendente | Processando | Finalizado",
  "data_Criacao": "datetime"
}
```

---

## Fluxo de Processamento

```
POST /orders
  → Salva pedido com status Pendente
  → Worker verifica fila a cada 3 segundos
  → Atualiza para Processando
  → Aguarda 5 segundos
  → Atualiza para Finalizado
```

---

## Como Rodar

### Pré-requisitos
- .NET 9 SDK
- Node.js 20+
- Docker

### 1. Subir o banco de dados

```bash
docker run --name orderdb -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=OrderDb -p 5434:5432 -d postgres
```

### 2. Rodar o backend

```bash
cd backend
dotnet run
```

API disponível em: `http://localhost:5089`  
Swagger em: `http://localhost:5089/swagger`

### 3. Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em: `http://localhost:5173`

---

## Variáveis de Ambiente

O arquivo `appsettings.json` contém a connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5434;Database=OrderDb;Username=postgres;Password=postgres"
}
```

---

## Funcionalidades do Frontend

- Listagem de pedidos em tabela responsiva
- Busca por cliente ou produto
- Formulário para criar novo pedido
- Modal com detalhes do pedido
- Feedback visual de status por cores:
  - 🟡 Pendente
  - 🔵 Processando
  - 🟢 Finalizado
- Atualização automática a cada 5 segundos

- Finalizar Docker Compose
- Implementar Health Checks
- Adicionar autenticação
