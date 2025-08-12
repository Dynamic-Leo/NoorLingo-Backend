import express from "express";
import usersController from "./usersController";
const usersRouter = express.Router();

usersRouter.route("/signup").post(usersController.create);
usersRouter.route("/getAll").get(usersController.getAll)
usersRouter.get("/:id", usersController.getSingleWithChildren);


export default usersRouter;
