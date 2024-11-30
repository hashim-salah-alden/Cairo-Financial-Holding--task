import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateJWTToken.ts";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/apiError";
import _ from "lodash";

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return next(new ApiError(400, "The User is already Exist"));
    }

    if (!email || !password || !name) {
      return next(new ApiError(400, "All fields are required"));
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      const sanitizedUser = _.omit(newUser, ["password"]);

      res.status(201).json({ message: "User registered", sanitizedUser });
    } else {
      return next(new ApiError(400, "Invalid user data"));
    }
  } catch (error) {
    return next(new ApiError(500, error));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const sanitizedUser = _.omit(user, ["password"]);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    if (!email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    if (user && isMatch) {
      generateToken(user.id, res);

      res.status(201).json({ message: "Logged in successfuly", sanitizedUser });
    }
  } catch (error) {
    return next(new ApiError(500, error));
  }
};
