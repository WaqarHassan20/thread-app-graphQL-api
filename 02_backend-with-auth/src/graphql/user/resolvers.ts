import {
  UserService,
  type CreateUserPayload,
  type GetUserTokenPayload,
} from "../../service/user";

// to get the data use queries
const queries = {
  sayName: (_: any, { name }: { name: string }) => {
    return `Hello ${name}, How are you doing ?`;
  },

  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context.user) {
      const userId = context.user.id;
      const user = await UserService.getUserById(userId);
      return user;
    } else {
      throw new Error("Unauthorized access. Please provide a valid token.");
    }
  },
};

// to modify the data use mutations
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
};

export const resolvers = {
  mutations,
  queries,
};
