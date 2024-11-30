import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./swagger/swagger.ts";

import authRoutes from "./routes/authRoutes.ts";
import taskRoutes from "./routes/taskRoutes.ts";

import globalErrorHandler from "./middlewares/globalError.ts";
import { ApiError } from "./utils/apiError.ts";

dotenv.config();
const app: express.Application = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
setupSwagger(app); // Add Swagger documentation


app.all(
  "*",
  (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(new ApiError(400, `cant find this route ${req.originalUrl}`));
  }
);

app.use(globalErrorHandler);


app.listen(PORT, () => {
  console.log(`('Server running on http://localhost:5000')`);
});
