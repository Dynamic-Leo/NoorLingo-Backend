"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const childrenValidator = {
    create: joi_1.default.object({
        name: joi_1.default.string().required(),
        ageGroup: joi_1.default.string().valid("2-3", "3-5", "5-10").required(),
        fluencyLevel: joi_1.default.string().valid("Beginner", "Intermediate", "Advanced").required(),
        gender: joi_1.default.string().valid("Boy", "Girl").required(),
        user: joi_1.default.number().required(), // userId foreign key
    }),
};
exports.default = childrenValidator;
