# GraphQL Resolver Parameters (The 3 Arguments)

## 🎯 Quick Overview

Every GraphQL resolver function receives **3 parameters**:

```typescript
resolverFunction(parent, args, context, info)
```

Most commonly, you'll use the first 3:

```typescript
(parent, args, context) => { /* your logic */ }
```

---

## 📋 The Three Parameters Explained

### 1️⃣ **Parent** (First Parameter) - Often written as `_`

**What it is:** The result from the **previous/parent** resolver in the chain

**When it's used:**
- ✅ Nested queries (e.g., getting a user's posts)
- ❌ Top-level queries/mutations (no parent, so it's `undefined`)

**Why we write `_`:** 
- It means "I'm not using this parameter"
- Convention in JavaScript/TypeScript for unused variables

```typescript
// Top-level query - parent is undefined, so we ignore it
const queries = {
  sayName: (_, { name }) => {
    return `Hello ${name}`;
  }
};

// Nested query - parent contains the User object
const User = {
  posts: (parent, args, context) => {
    // parent = { id: 1, name: "John", email: "..." }
    return context.db.posts.findMany({ userId: parent.id });
  }
};
```

---

### 2️⃣ **Args** (Second Parameter) - The `params`/`payload`

**What it is:** The **arguments** passed in the GraphQL query/mutation

**This is:** The data sent by the client

```typescript
// GraphQL Query Definition
sayName(name: String!): String
createUser(firstName: String!, email: String!): String

// Resolver Implementation
const queries = {
  // args = { name: "Waqar" }
  sayName: (_, args) => {
    return `Hello ${args.name}`;
  },
  
  // Destructured: { name } instead of args.name
  sayName: (_, { name }) => {
    return `Hello ${name}`;
  }
};

const mutations = {
  // args = { firstName: "Waqar", email: "waqar@example.com", ... }
  createUser: async (_, payload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  }
};
```

**Common naming:**
- `args` - Generic arguments
- `payload` - For mutations (creating/updating data)
- Destructured: `{ name, email }` - Direct access to fields

---

### 3️⃣ **Context** (Third Parameter) - Shared data across all resolvers

**What it is:** An **object shared** across all resolvers in a single request

**Common uses:**
- 🔐 Authenticated user info
- 🗄️ Database connection
- 🔑 Request headers/tokens
- 🛠️ Utility functions

```typescript
// Setup in Apollo Server (index.ts)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Extract token from headers
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token);
    
    return {
      user,           // Current logged-in user
      db: prismaClient,  // Database client
      token,          // JWT token
    };
  }
});

// Use in Resolvers
const queries = {
  getCurrentLoggedInUser: async (_, __, context) => {
    // Access the user from context
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    return context.user;
  },
  
  getUserPosts: async (_, { userId }, context) => {
    // Access database from context
    return context.db.posts.findMany({ 
      where: { userId } 
    });
  }
};
```

**Why use `__` (double underscore)?**
- When you don't need `parent` or `args`, but DO need `context`
- `(_, __, context)` = "skip first two, use third"

---

## 🔍 Real Examples from Your Code

### Example 1: Only using Args (2nd param)
```typescript
sayName: (_, { name }: { name: string }) => {
  return `Hello ${name}, How are you doing?`;
}
// _ = parent (not used)
// { name } = destructured args (used)
// context = not needed, so omitted
```

### Example 2: Using Args for Mutation
```typescript
createUser: async (_, payload: CreateUserPayload) => {
  const user = await UserService.createUser(payload);
  return user.id;
}
// _ = parent (not used)
// payload = all the user data (firstName, lastName, email, password)
// context = not needed, so omitted
```

### Example 3: When Context is Needed
```typescript
getCurrentLoggedInUser: async (_, __, context) => {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
  return context.user;
}
// _ = parent (not used)
// __ = args (not used)
// context = used to get authenticated user
```

---

## 📊 Quick Reference Table

| Parameter | Position | Common Names | Contains | When to Use |
|-----------|----------|--------------|----------|-------------|
| **Parent** | 1st | `parent`, `_` | Previous resolver result | Nested queries |
| **Args** | 2nd | `args`, `payload`, `{ field }` | Client input data | Almost always |
| **Context** | 3rd | `context`, `ctx` | Shared request data | Auth, DB access |

---

## 💡 Key Takeaways

1. **`_` (parent)**: Ignore it in top-level queries/mutations
2. **`args/payload`**: The data from client - use this most often
3. **`context`**: Shared data like auth user, database - use when needed
4. You can **skip parameters** you don't need (e.g., just use first 2)
5. Use `__` to skip parameters when you need later ones

---

## 🎓 Mental Model

```
Client Request
     ↓
┌─────────────────────────────────────┐
│  Resolver(parent, args, context)    │
│                                     │
│  parent  ← From previous resolver   │
│  args    ← From client request     │
│  context ← Set once per request    │
└─────────────────────────────────────┘
     ↓
Return Response
```

**Remember:** Most of the time you'll use `(_, args)` or `(_, args, context)`!
