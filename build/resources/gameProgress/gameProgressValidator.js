"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fluencyGames = void 0;
const joi_1 = __importDefault(require("joi"));
const lessonGameMap_1 = require("../../utils/lessonGameMap");
const allowedPronunciation = ["Poor", "Average", "Good", "Excellent"];
const allowedSpeed = ["Slow", "Normal", "Fast"];
const allowedIntonation = ["Fair", "Varied", "Expressive"];
exports.fluencyGames = ["Fluency Game", "Masdar City", "Read to Rescue"];
const progressValidator = {
    upsert: joi_1.default.object({
        childId: joi_1.default.number().required(),
        gameName: joi_1.default.string()
            .valid(...lessonGameMap_1.allowedGameNames)
            .required()
            .messages({
            "any.only": `gameName must be one of: ${lessonGameMap_1.allowedGameNames.join(", ")}`,
        }),
        lesson: joi_1.default.string()
            .valid(...lessonGameMap_1.allowedLessons)
            .required()
            .messages({
            "any.only": `lesson must be one of: ${lessonGameMap_1.allowedLessons.join(", ")}`,
        }),
        completed: joi_1.default.boolean().required(),
        correctAnswers: joi_1.default.number().min(0).when("gameName", {
            is: joi_1.default.string().valid(...exports.fluencyGames, "Pollution Police", "Masdar City Summary"),
            then: joi_1.default.forbidden(),
            otherwise: joi_1.default.required(),
        }),
        totalQuestions: joi_1.default.number().min(1).when("gameName", {
            is: joi_1.default.string().valid(...exports.fluencyGames, "Pollution Police", "Masdar City Summary"),
            then: joi_1.default.forbidden(),
            otherwise: joi_1.default.required(),
        }),
        pronunciation: joi_1.default.string().valid(...allowedPronunciation).when("gameName", {
            is: joi_1.default.string().valid(...exports.fluencyGames),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
        }),
        speed: joi_1.default.string().valid(...allowedSpeed).when("gameName", {
            is: joi_1.default.string().valid(...exports.fluencyGames),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
        }),
        intonation: joi_1.default.string().valid(...allowedIntonation).when("gameName", {
            is: joi_1.default.string().valid(...exports.fluencyGames),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
        }),
        paragraph: joi_1.default.string().when("gameName", {
            is: joi_1.default.string().valid("Pollution Police", "Masdar City Summary"),
            then: joi_1.default.required(),
            otherwise: joi_1.default.forbidden(),
        }),
    }),
};
exports.default = progressValidator;
