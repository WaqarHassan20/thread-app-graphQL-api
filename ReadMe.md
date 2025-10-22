# 🚀 Thread App - GraphQL API Backend

> A modern, scalable GraphQL API backend built with TypeScript, Apollo Server, and PostgreSQL. Features JWT authentication, secure password hashing, and a clean modular architecture.

---

## ✨ Features

- 🎯 **GraphQL API** - Type-safe queries and mutations with Apollo Server
- 🔐 **JWT Authentication** - Secure token-based authentication system
- 🔒 **Password Security** - SHA-256 hashing with random salt generation
- 🗄️ **PostgreSQL Database** - Robust data persistence with Prisma ORM
- 🐳 **Docker Support** - Easy database setup with Docker Compose
- ⚡ **Hot Reload** - Fast development with Bun runtime
- 📦 **Modular Architecture** - Clean separation of concerns

---

## 🏗️ Project Structure

```
thread-app-api-graphql/
│
├── 01_simple-backend/          # Basic GraphQL implementation
│   └── Simple queries & mutations without auth
│
└── 02_backend-with-auth/       # Full-featured backend
    ├── src/
    │   ├── graphql/            # GraphQL layer
    │   │   ├── index.ts        # Apollo Server setup
    │   │   └── user/           # User module
    │   │       ├── queries.ts      # Read operations
    │   │       ├── mutations.ts    # Write operations
    │   │       ├── typedefs.ts     # Type definitions
    │   │       └── resolvers.ts    # Implementation
    │   │
    │   ├── service/            # Business logic layer
    │   │   └── user.ts         # User service (auth, CRUD)
    │   │
    │   ├── lib/                # Utilities
    │   │   └── db.ts           # Prisma client
    │   │
    │   ├── index.ts            # Express + GraphQL middleware
    │   └── bin.ts              # Server entry point
    │
    └── prisma/
        └── schema.prisma       # Database schema
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Bun** | Fast JavaScript runtime & package manager |
| **TypeScript** | Type safety & better DX |
| **Apollo Server** | GraphQL server implementation |
| **Express** | Web framework |
| **Prisma** | Type-safe ORM |
| **PostgreSQL** | Relational database |
| **JWT** | Authentication tokens |
| **Crypto** | Password hashing |

---

## 🚦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- Docker & Docker Compose (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/WaqarHassan20/thread-app-graphQL-api.git
cd thread-app-api-graphql

# Choose your version
cd 02_backend-with-auth

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Start PostgreSQL with Docker
docker-compose up -d

# Run Prisma migrations
bunx prisma migrate dev

# Start development server
bun run dev
```

Server will be running at: **http://localhost:3001/graphql**

---

## 🔌 API Operations

### 🔍 Queries (Read Data)

**1. Say Name** - Simple greeting
```graphql
query {
  sayName(name: "Waqar")
}
```

**2. Get User Token** - Login & get JWT
```graphql
query {
  getUserToken(
    email: "user@example.com"
    password: "password123"
  )
}
```

**3. Get Current User** - Get logged-in user info (requires token)
```graphql
query {
  getCurrentLoggedInUser {
    id
    firstName
    lastName
    email
    profileImageURL
  }
}
```

### ✏️ Mutations (Write Data)

**Create User** - Register new account
```graphql
mutation {
  createUser(
    firstName: "Waqar"
    lastName: "Hassan"
    email: "waqar@example.com"
    password: "securepass123"
  )
}
```

### 🔑 Authentication

For protected routes, include JWT token in headers:
```json
{
  "token": "your-jwt-token-here"
}
```

---

## 📊 Database Schema

```prisma
model User {
  id              String   @id @default(uuid())
  firstName       String
  lastName        String?
  email           String   @unique
  password        String   # Hashed with SHA-256
  salt            String   # Random salt for password
  profileImageURL String?
}
```

---

## 🏛️ Architecture

```
Client Request
    ↓
Express Server (index.ts)
    ↓
Apollo GraphQL (graphql/index.ts)
    ↓
Resolvers (user/resolvers.ts)
    ↓
Services (service/user.ts) ← Business Logic
    ↓
Prisma ORM (lib/db.ts)
    ↓
PostgreSQL Database
```

**Key Principles:**
- **Resolvers** → Thin layer, route requests
- **Services** → Business logic, security, validation
- **Prisma** → Database operations, type safety

---

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ SHA-256 password hashing with random salt
- ✅ Secure password storage (never plain text)
- ✅ Email uniqueness validation
- ✅ Context-based auth in GraphQL resolvers

---

## 📝 Scripts

```bash
# Development with hot reload
bun run dev

# Generate Prisma client
bunx prisma generate

# Create migration
bunx prisma migrate dev --name migration_name

# Open Prisma Studio (DB GUI)
bunx prisma studio
```

---

## 🐳 Docker Setup

PostgreSQL runs in Docker container:
- **Host:** localhost
- **Port:** 5432
- **Database:** threads
- **User:** postgres
- **Password:** postgres

---

## 📚 Documentation

- 📖 [GraphQL.md](./01_simple-backend/GraphQL.md) - GraphQL concepts & components
- 📖 [README.md](./02_backend-with-auth/README.md) - Resolver parameters guide
- 📖 [files.md](./02_backend-with-auth/files.md) - Complete file structure explanation

---

## 🎯 Learning Path

1. **Start with:** `01_simple-backend` - Basic GraphQL setup
2. **Move to:** `02_backend-with-auth` - Full implementation with auth
3. **Read:** Documentation files for deep understanding

---

<div align="center">

GitHub: [@WaqarHassan20](https://github.com/WaqarHassan20)


⭐ Star this repo if you find it helpful!

</div>

---