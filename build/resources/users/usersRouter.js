"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("./usersController"));
const usersRouter = express_1.default.Router();
usersRouter.route("/signup").post(usersController_1.default.create);
usersRouter.route("/getAll").get(usersController_1.default.getAll);
usersRouter.get("/:id", usersController_1.default.getSingleWithChildren);
exports.default = usersRouter;
