"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationController_1 = __importDefault(require("./authenticationController"));
const authenticationRouter = express_1.default.Router();
// authenticationRouter.route("/login").post(authenticationController.login);
authenticationRouter.post("/login", authenticationController_1.default.login);
exports.default = authenticationRouter;
