import { User, Prisma } from "@prisma/client";
import { Context } from "../../index";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SiGNATURE } from "../../kyes";

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
  token: string | null;
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
        token: null,
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
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "invalid name or bio",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SiGNATURE,
      {
        expiresIn: 360000,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
