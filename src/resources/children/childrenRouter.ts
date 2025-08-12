import express from "express";
import childrenController from "./childrenController";

const childrenRouter = express.Router();

childrenRouter.route("/add").post(childrenController.create);
childrenRouter.route("/getByUser/:userId").get(childrenController.getByUser);
childrenRouter.route("/get/:id").get(childrenController.getById);


export default childrenRouter;
