import express from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/apiError.js";

const prisma = new PrismaClient();

export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ApiError(401, "Unauthorized: No Token Provided"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new ApiError(401, "Unauthorized: Invalid Token"));
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) return next(new ApiError(404, "User not found"));

    const sanitizedUser = _.omit(user, ["password"]);

    req.user = sanitizedUser;
    next();
  } catch (error) {
    return next(new ApiError(500, "Internal Server Error"));
  }
};
