import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./middleware/errorHandler.middleware";
import autehnticationMiddleware from "./middleware/authenticationMiddleware";

import "./db";
import usersRouter from "./resources/users/usersRouter";
import userbankRouter from './resources/userBankdetails/userBankDetailsRouter'
import childrenRouter from "./resources/children/childrenRouter";
import gameProgressRouter from "./resources/gameProgress/gameProgressRouter";
// import authenticationRouter from "./resources/authentication/authenticationRouter";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// app.use(autehnticationMiddleware);
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

// app.use("/api/v1/auth", authenticationRouter);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/userBankDetails",userbankRouter );
app.use("/api/v1/children",childrenRouter)
app.use("/api/v1/progress", gameProgressRouter);
app.use(globalErrorHandler);

export default app;
// http://localhost:3006/api/v1/users/getAll