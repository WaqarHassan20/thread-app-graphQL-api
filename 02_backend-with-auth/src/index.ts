import { expressMiddleware } from "@as-integrations/express5";
import { createApolloServer } from "./graphql";
import express from "express";
import { UserService } from "./service/user";

export const app = express();

async function initServer() {
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.send("Server is up and running with Auth!");
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          console.error("Failed to decode JWT token:", error);
          return { user: null };
        }
      },
    })
  );
}

await initServer();
