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
import avatarRouter from "./resources/avatar/avatarRouter";
import path from "path";

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(express.json());
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
app.use("/public", express.static(PUBLIC_DIR));

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
app.use("/api/v1/avatars", avatarRouter);

// app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(globalErrorHandler);

export default app;