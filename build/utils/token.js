"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (user) => {
    const payload = {
        id: user.id,
        token: user.token,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // access token valid for 15 minutes
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    const payload = {
        id: user.id,
        token: user.token,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // refresh token valid for 1 days
    });
};
exports.createRefreshToken = createRefreshToken;
const verifyToken = (token_1, ...args_1) => __awaiter(void 0, [token_1, ...args_1], void 0, function* (token, isRefreshToken = false) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, isRefreshToken
            ? process.env.JWT_REFRESH_SECRET
            : process.env.JWT_SECRET, (err, payload) => {
            if (err)
                return reject(err);
            resolve(payload);
        });
    });
});
exports.verifyToken = verifyToken;
