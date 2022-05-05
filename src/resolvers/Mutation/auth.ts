import { Prisma } from "@prisma/client";
import { Context } from "../../index";

interface singupArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

export const authResolvers = {
  signup: (
    _: any,
    { email, name, password, bio }: singupArgs,
    { prisma }: Context
  ) => {
    return prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  },
};
