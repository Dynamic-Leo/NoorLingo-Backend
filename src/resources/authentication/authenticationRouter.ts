import express from "express";
import authenticationController from "./authenticationController";
const authenticationRouter = express.Router();

// authenticationRouter.route("/login").post(authenticationController.login);
authenticationRouter.post("/login", authenticationController.login);
authenticationRouter.post("/google", authenticationController.googleLogin);

export default authenticationRouter;
