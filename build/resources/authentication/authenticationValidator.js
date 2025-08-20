"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const authenticationValidator = {
    login: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Email must be valid",
            "string.empty": "Email is required",
        }),
        password: joi_1.default.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters",
            "string.empty": "Password is required",
        }),
    }),
};
exports.default = authenticationValidator;
