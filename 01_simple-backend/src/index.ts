import { expressMiddleware } from "@as-integrations/express5";
import { createApolloServer } from "./graphql";
import express from "express";

export const app = express();

async function initServer() {
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.send("Server is up and running with Prisma!");
  });

  app.use("/graphql", expressMiddleware(await createApolloServer()));
}

await initServer();
