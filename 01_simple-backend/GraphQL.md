# GraphQL API - Thread App


## 🔗 How GraphQL Components Link Together

### The Flow: TypeDefs → Queries/Mutations → Resolvers → Implementation

```
┌─────────────┐
│  TypeDefs   │  Define the SHAPE of your data & operations
└──────┬──────┘  (What fields exist? What types?)
       │
       ├──────────────┬──────────────┐
       ↓              ↓              ↓
┌─────────────┐ ┌──────────┐ ┌──────────┐
│   Queries   │ │Mutations │ │  Types   │  Define WHAT operations exist
└──────┬──────┘ └─────┬────┘ └──────────┘  (Function signatures as strings)
       │              │
       └──────┬───────┘
              ↓
       ┌─────────────┐
       │  Resolvers  │  Define HOW operations work
       └──────┬──────┘  (Actual JavaScript functions)
              ↓
       ┌─────────────┐
       │Implementation│  Execute business logic
       └─────────────┘  (Database calls, validation, etc.)
```
---
---

### Key Terms

- typedef ==> defines the structure of the data
- query ==> used to get the data from the server
- mutation ==> used to modify the data on the server
- resolver ==> function that resolves a query or mutation

---
---

### Component Relationships

#### 1. **Queries** (`queries.ts`)
- **What**: String definitions of GraphQL queries
- **Example**: `sayName(name: String!): String`
- **Purpose**: Declares what data can be READ

#### 2. **Mutations** (`mutations.ts`)
- **What**: String definitions of GraphQL mutations
- **Example**: `createUser(firstName: String!, ...): Boolean`
- **Purpose**: Declares what data can be WRITTEN/MODIFIED

#### 3. **Resolvers** (`resolvers.ts`)
- **What**: JavaScript functions implementing queries & mutations
- **Link**: Function names MUST match the query/mutation names
- **Example**:
  ```typescript
  const queries = {
    sayName: (_, { name }) => `Hello ${name}` // Matches "sayName" query
  }
  
  const mutations = {
    createUser: async (_, { firstName, ... }) => { /* DB logic */ }
  }
  ```

#### 4. **TypeDefs** (`typedef.ts`)
- **What**: GraphQL type definitions (User, Post, etc.)
- **Purpose**: Define custom object shapes
- **Currently**: Empty in your project

### 🔄 Complete Connection Example

```typescript
// 1. MUTATION STRING (mutations.ts) - "What exists"
export const mutations = `
    createUser(firstName: String!, email: String!): Boolean
`;

// 2. RESOLVER FUNCTION (resolvers.ts) - "How it works"
const mutations = {
  createUser: async (_, { firstName, email }) => {
    await prismaClient.user.create({
      data: { firstName, email, ... }
    });
    return true;
  }
};

// 3. APOLLO SERVER (graphql/index.ts) - "Wire it together"
new ApolloServer({
  typeDefs: `
    type Mutation {
      ${user.mutations}  // Injects the mutation string
    }
  `,
  resolvers: {
    Mutation: {
      ...user.resolvers.mutations  // Injects the function
    }
  }
});
```

### 🎯 Key Principle

**The NAME connects everything:**
- Query/Mutation string: `sayName(name: String!): String`
- Resolver function: `sayName: (_, args) => { ... }`
- GraphQL matches them by **name** (`sayName`)

When a GraphQL request arrives:
1. Apollo parses the query/mutation name
2. Finds the matching resolver function
3. Executes it with the provided arguments
4. Returns the result according to the defined type

---

## 🚀 Current Implementation

**Working Queries:**
- `sayName(name: String!): String` - Simple greeting

**Working Mutations:**
- `createUser(...)` - Creates new user in PostgreSQL via Prisma

**Database:** PostgreSQL (via Docker) with Prisma ORM


---

# 🧩 Example: “Counter” App (GraphQL)


### TypeDefs:

- type Query { getCount: Int }
- type Mutation { increment: Int }

### Resolvers:

let count = 0;
export const resolvers = {
  Query: { getCount: () => count },
  Mutation: { increment: () => ++count },
};



### 💡 Summary

| Part         | Purpose                 | Example                            |
| ------------ | ----------------------- | ---------------------------------- |
| **Query**    | Read data               | `getCount → returns current count` |
| **Mutation** | Change data             | `increment → increases count`      |
| **Resolver** | Logic behind each field | Functions that handle these        |
