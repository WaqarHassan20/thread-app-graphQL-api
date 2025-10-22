import { ApolloServer } from "@apollo/server";
import { user } from "./user";

export async function createApolloServer() {
  const GqlServer = new ApolloServer({
    typeDefs: `
      
      ${user.typedefs}
      
      type Query {  
          ${user.queries}    
        }
        
      type Mutation {
            ${user.mutations}
        }
    `,

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
