"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const childrenController_1 = __importDefault(require("./childrenController"));
const childrenRouter = express_1.default.Router();
childrenRouter.route("/add").post(childrenController_1.default.create);
childrenRouter.route("/getByUser/:userId").get(childrenController_1.default.getByUser);
childrenRouter.route("/get/:id").get(childrenController_1.default.getById);
exports.default = childrenRouter;
