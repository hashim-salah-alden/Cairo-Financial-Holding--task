import express from "express";
import { PrismaClient } from "@prisma/client";

import { ApiError } from "../utils/apiError";

const prisma = new PrismaClient();

export const getTasks = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({ where: { userId } });

    if (!tasks) {
      return res.status(200).json([]);
    }
    res.status(200).json(tasks);
  } catch (error: any) {
    return next(new ApiError(500, error.message));
  }
};

export const createTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user.id;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error: any) {
    return next(new ApiError(500, error.message));
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { title, description, dueDate, status } = req.body;
  const { taskId } = req.params;
  const userId = req.user.id;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    // check if the current user has the permission to update  check if the user is the owner of the task
    if (task?.userId !== userId) {
      return next(
        new ApiError(401, "You are not authorized to update this task")
      );
    }

    await prisma.task.update({
      where: { id: taskId },
      data: { title, description, dueDate, status },
    });

    res.status(201).json(task);
  } catch (error: any) {
    return next(new ApiError(500, error.message));
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    // check if the current user has the permission to delete the task
    if (task?.userId !== userId) {
      return next(
        new ApiError(401, "You are not authorized to delete this task")
      );
    }

    await prisma.task.delete({ where: { id: taskId } });
    res.status(204).send();
  } catch (error: any) {
    return next(new ApiError(500, error.message));
  }
};
