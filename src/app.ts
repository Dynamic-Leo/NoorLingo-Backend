import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./middleware/errorHandler.middleware";

import "./db";
import autehnticationMiddleware from "./middleware/authenticationMiddleware";
import usersRouter from "./resources/users/usersRouter";
import childrenRouter from "./resources/children/childrenRouter";
import gameProgressRouter from "./resources/gameProgress/gameProgressRouter";
import authenticationRouter from "./resources/authentication/authenticationRouter";

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}
app.use("/api/v1/auth", authenticationRouter);

app.use(autehnticationMiddleware);


app.use("/api/v1/users", usersRouter);
app.use("/api/v1/children",childrenRouter)
app.use("/api/v1/progress", gameProgressRouter);
app.use(globalErrorHandler);

export default app;