import { Post, Prisma } from "@prisma/client";
import { stripIgnoredCharacters } from "graphql";
import { Context } from "../index";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const Mutation = {
  // Create a post
  createPost: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

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

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      }),
    };
  },

  // Update post
  updatePost: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You have at least on field for update post",
          },
        ],
        post: null,
      };
    }

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!postExist) {
      return {
        userErrors: [
          {
            message: "post not exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate: { title?: string; content?: string } = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    return {
      userErrors: [],
      post: prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },

  // Delete post
  deletePost: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return {
        userErrors: [
          {
            message: "Sorry, post not found!",
          },
        ],
        post: null,
      };
    }
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    return {
      userErrors: [],
      post,
    };
  },
};
