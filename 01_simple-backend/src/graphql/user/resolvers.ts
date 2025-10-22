import { prismaClient } from "../../lib/db";

const mutations = {
    createUser: async (
    _: any,
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
};

const queries = {
  sayName: (_: any, { name }: { name: string }) => {
    return `Hello ${name}, How are you doing ?`;
  },
};

export const resolvers = {
  mutations,
  queries,
};
