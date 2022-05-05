import { User, Prisma } from "@prisma/client";
import { Context } from "../../index";
import validator from "validator";
import bcrypt from "bcryptjs";

interface SingupArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  user: User | Prisma.Prisma__UserClient<User> | null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { email, name, password, bio }: SingupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "Invaild email",
          },
        ],
        user: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 6,
    });

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: "invalid password!. minimum lengt is 6",
          },
        ],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "invalid name or bio",
          },
        ],
        user: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      userErrors: [],
      user: null,
    };
  },
};
