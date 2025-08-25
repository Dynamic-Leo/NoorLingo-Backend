// src/modules/avatar/avatarRouter.ts
import express from "express";
import avatarController from "./avatarController";

const avatarRouter = express.Router();

avatarRouter.get("/", avatarController.getAll);

export default avatarRouter;
