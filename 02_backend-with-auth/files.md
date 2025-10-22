# GraphQL Backend Structure - Quick Guide 🏗️

> **Restaurant Analogy:** Client (customer) → Server (building) → GraphQL (waiter) → Service (chef) → Database (storage)

---

## 🎯 The Flow

```
Client → bin.ts → index.ts → graphql/index.ts → user/ → service/user.ts → lib/db.ts → Database
```

---

## 📂 Files Explained

### **1. `bin.ts`** - Starts the server
```typescript
app.listen(PORT) // Opens for business on port 3001
```

### **2. `index.ts`** - Main server setup
- Sets up Express server
- Creates `/graphql` endpoint  
- **Authentication:** Extracts JWT token from headers, decodes it, passes user to all resolvers via `context`

### **3. `graphql/index.ts`** - Apollo Server
- Combines user module (typedefs, queries, mutations, resolvers)
- Creates GraphQL server
- Links query/mutation names to resolver functions

### **4. `graphql/user/`** - User Module (4 files)

**a. `index.ts`** - Exports everything as one package
```typescript
export const user = { typedefs, resolvers, mutations, queries };
```

**b. `typedefs.ts`** - Defines User shape
```typescript
type User { id: ID!, firstName: String!, email: String!, ... }
```

**c. `queries.ts`** - Read operations (strings)
```typescript
sayName(name: String!): String
getUserToken(email: String!, password: String!): String
getCurrentLoggedInUser: User
```

**d. `mutations.ts`** - Write operations (strings)
```typescript
createUser(firstName: String!, ...): String
```

**e. `resolvers.ts`** - Implementation functions
- **Queries:** Functions that READ data
- **Mutations:** Functions that WRITE data
- Calls `UserService` for business logic
- Uses `context.user` for authentication

**Resolver Parameters:**
1. `_` (parent) - Previous resolver result (unused in top-level)
2. `payload/args` - Input data from client
3. `context` - Shared data (logged-in user, etc.)

### **5. `service/user.ts`** - Business Logic
- `createUser()` - Hash password + save to DB
- `getUserToken()` - Validate credentials + generate JWT
- `getUserById()` - Fetch user from DB
- `decodeJWTToken()` - Verify token
- Uses `crypto` for hashing, `jsonwebtoken` for JWT

### **6. `lib/db.ts`** - Database connection
```typescript
export const prismaClient = new PrismaClient(); // Single DB connection
```

### **7. `prisma/schema.prisma`** - Database blueprint
```prisma
model User {
  id       String @id @default(uuid())
  email    String @unique
  password String
  salt     String
  ...
}
```

---

## 🔗 Complete Flow Example: Create User

```
1. Client sends: mutation { createUser(firstName: "Waqar", ...) }
2. bin.ts/index.ts receives request
3. graphql/index.ts finds "createUser" mutation
4. resolvers.ts executes: createUser(_, payload) → calls UserService.createUser()
5. service/user.ts: generates salt → hashes password → calls prismaClient.user.create()
6. lib/db.ts: Prisma executes SQL INSERT
7. Database stores data
8. Response flows back: DB → Prisma → Service → Resolver → Client
```

---

## 🔐 Authentication Flow

```
1. Login: getUserToken(email, password) → Returns JWT token
2. Client stores token, sends in headers: { "token": "eyJh..." }
3. index.ts context extracts token → decodes user → passes to resolvers
4. Resolver accesses: context.user (available everywhere!)
5. getCurrentLoggedInUser checks context.user → fetches from DB → returns user
```

---

## 🎓 Key Concepts

**Separation of Concerns:**
- **Resolvers** → Take orders (thin layer)
- **Services** → Business logic (the brain)
- **Prisma/DB** → Data storage

**Module Pattern:**
Each feature gets: `queries.ts`, `mutations.ts`, `typedefs.ts`, `resolvers.ts`, `index.ts`

**Why?**
- ✅ Organized & easy to navigate
- ✅ Reusable code
- ✅ Testable layers
- ✅ Scalable structure

---

## 🚀 Quick Reference

| Task | File to Edit |
|------|--------------|
| Add read operation | `queries.ts` + function in `resolvers.ts` |
| Add write operation | `mutations.ts` + function in `resolvers.ts` |
| Business logic | `service/user.ts` |
| Database fields | `prisma/schema.prisma` + migrate |
| Authentication | `index.ts` context |
| Data shapes | `typedefs.ts` |

---

## 💡 Restaurant Analogy

| Restaurant | Code |
|------------|------|
| 🏪 Building | Express + Apollo Server |
| 📋 Menu | queries + mutations + typedefs |
| 👨‍💼 Waiter | resolvers.ts |
| 🧑‍🍳 Chef | service/user.ts |
| 🗄️ Storage | PostgreSQL |
| 🎫 Member Card | JWT Token |

**Flow:** Customer → Security check → Waiter → Chef → Storage → Back to customer
