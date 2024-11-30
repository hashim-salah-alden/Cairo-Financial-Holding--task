import express from "express";
import { ApiError } from "../utils/apiError";

const globalErrorHandler = (
  err: ApiError,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).send({
    status: err.status,
    error: err,
    message: err.message,
  });
};

export default globalErrorHandler;

