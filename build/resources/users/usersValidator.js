"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const usersValidator = {
    create: joi_1.default.object({
        name: joi_1.default.string().required().error(new Error("Name must be a string")),
        // phone: Joi.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(8)
            //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        role: joi_1.default.string().required().valid("admin", "user"),
    }),
};
exports.default = usersValidator;
