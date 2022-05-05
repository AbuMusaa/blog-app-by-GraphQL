import { Context } from "../index";

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany();
  },
  users: (_: any, __: any, { prisma }: Context) => {
    return prisma.user.findMany();
  },
};
