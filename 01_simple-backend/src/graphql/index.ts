import { ApolloServer } from "@apollo/server";
import { user } from "./user";

export async function createApolloServer() {
  const GqlServer = new ApolloServer({
    // typedefs are actually the models of data, what is the shape of data
    typeDefs: `type Query {
        ${user.queries}
    }
    
    type Mutation {
        ${user.mutations}
    }`,

    // resolvers are actually definition functions that how to work and fetch data
    resolvers: {
      Query: {
        ...user.resolvers.queries,
      },

      Mutation: {
        ...user.resolvers.mutations,
      },
    },
  });

  await GqlServer.start();

  return GqlServer;
}