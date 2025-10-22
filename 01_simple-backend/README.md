# GraphQL with Bun.js

## 📌 What is GraphQL?

GraphQL is a query language for APIs developed by Facebook. It allows clients to request exactly the data they need through a single endpoint.

**Key Features:**
- Single endpoint for all data
- Strongly typed schema
- No over/under-fetching
- Real-time subscriptions
- Self-documenting

---

## 🤔 GraphQL vs REST

| Feature | GraphQL | REST |
|---------|---------|------|
| **Endpoints** | Single | Multiple |
| **Data Fetching** | Exact fields | Fixed structure |
| **Over-fetching** | ❌ | ✅ |
| **Versioning** | Not needed | v1, v2, v3... |
| **Real-time** | Built-in | Manual setup |

**Use GraphQL When:**
- Building complex applications
- Mobile apps (minimize requests)
- Multiple clients need different data
- Real-time features needed

**Use REST When:**
- Simple CRUD operations
- Heavy file uploads
- HTTP caching critical
- Simple APIs

---

## 🚀 Quick Setup

⚙️ Backend Server Setup

| 🪜 Step | 🧰 Command                          | 📝 Purpose                                             |
| :-----: | :---------------------------------- | :----------------------------------------------------- |
|   1️⃣   | `bun init`                          | Initialize a new Bun project                           |
|   2️⃣   | `bun add express @types/express`    | Install Express (web framework) + its TypeScript types |
|   3️⃣   | `bun add cors @types/cors`          | Enable Cross-Origin Resource Sharing (CORS)            |
|   4️⃣   | `bun add body-parser`               | Parse incoming JSON/form requests                      |
|   5️⃣   | `bun add axios`                     | HTTP client for making API requests                    |
|   6️⃣   | `bun add @apollo/server graphql`    | Add Apollo GraphQL Server                              |
|   7️⃣   | `bun add @as-integrations/express5` | Integrate Apollo Server with Express v5                |


💻 Client Setup

| 🪜 Step | 🧰 Command                       | 📝 Purpose                                                        |
| :-----: | :------------------------------- | :---------------------------------------------------------------- |
|   1️⃣   | `bun create vite@latest client`  | Create a React client using Vite                                  |
|   2️⃣   | `bun add @apollo/client graphql` | Install Apollo Client and GraphQL core                            |
|   3️⃣   | `bun add @apollo/client/react`   | (Optional) React-specific Apollo components like `ApolloProvider` |
|   4️⃣   | `bun add axios`                  | Add Axios for REST or external API calls                          |

---

## 💡 Best Practices

1. ✅ Use DataLoader for N+1 prevention
2. ✅ Set query depth/complexity limits
3. ✅ Use strong typing
4. ✅ Implement cursor-based pagination
5. ✅ Use fragments for reusability
6. ✅ Proper error handling
7. ✅ Disable introspection in production
8. ✅ Monitor query performance

---


## Adding the prisma ORM in project

- bun add prisma
- bunx prisma init
- docker compose up -d
- docker ps
- docker exec -it <container_id> sh
- psql -U postgres
- \l                 ==> List of databases
- \c db_name         ==> Connect to your database
- \d                 ==> List of tables of connected database
- \d table_name      ==> Describe table structure
- \q                 ==> Quit psql
- \r                 ==> Refresh schema and reset buffer
---

**Built with ❤️ using Bun.js**