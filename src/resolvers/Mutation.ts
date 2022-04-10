import { Context } from "../index";

interface createPostArgs {
  title: string;
  content: string;
}

export const Mutation = {
  createPost: async (
    _: any,
    { title, content }: createPostArgs,
    { prisma }: Context
  ) => {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
  },
};
