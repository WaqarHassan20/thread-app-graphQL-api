import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServer } from "@apollo/server";
import { prismaClient } from "./src/lib/db";
import express from "express";

export const app = express();

async function initServer() {
  app.use(express.json());

  const GqlServer = new ApolloServer({
    // typedefs are actually the models of data, what is the shape of data
    typeDefs: `type Query {
        hello: String,
        sayName(name: String!): String
    }
    
    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
    }
    
    `,

    // resolvers are actually definition functions that how to work and fetch data
    resolvers: {
      Query: {
        hello: () => {
          return "Hello I'm from GraphQL Server now using watch mode!";
        },
        sayName: (_, { name }: { name: string }) => {
          return `Hello ${name}, How are you doing ?`;
        },
      },

      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "random_salt", // In real application, generate a proper salt
            },
          });
          return true;
        },
      },
    },
  });

  await GqlServer.start();

  app.get("/", (req, res) => {
    return res.send("Server is up and running!");
  });

  app.use("/graphql", expressMiddleware(GqlServer));
}

await initServer();
