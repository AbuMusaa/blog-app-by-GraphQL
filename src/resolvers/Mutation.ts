import { Post } from "@prisma/client";
import { Context } from "../index";

interface CreatePostArgs {
  title: string;
  content: string;
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  createPost: async (
    _: any,
    { title, content }: CreatePostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must have title and content to create a post",
          },
        ],
        post: null,
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    return {
      userErrors: [],
      post,
    };
  },
};
