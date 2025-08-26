"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/avatar/avatarRouter.ts
const express_1 = __importDefault(require("express"));
const avatarController_1 = __importDefault(require("./avatarController"));
const avatarRouter = express_1.default.Router();
avatarRouter.get("/", avatarController_1.default.getAll);
exports.default = avatarRouter;
