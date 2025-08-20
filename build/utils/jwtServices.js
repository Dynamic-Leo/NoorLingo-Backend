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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtServices = {
    create: (data, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
        const jwtKey = process.env.JWT_SECRET;
        if (!jwtKey) {
            throw new Error("JWT secret key not found in environment variables");
        }
        const expireIn = expiresIn || process.env.ACCESS_TOKEN_EXPIRES_IN || "365d";
        return jsonwebtoken_1.default.sign(data, jwtKey, { expiresIn: expireIn });
    }),
    authenticate: (token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jwtKey = process.env.JWT_SECRET;
            if (!jwtKey) {
                throw new Error("JWT secret key not found in environment variables");
            }
            const decoded = jsonwebtoken_1.default.verify(token, jwtKey);
            // Ensure we only return objects that contain userId
            if (typeof decoded === "string")
                return null;
            if (!("userId" in decoded))
                return null;
            return decoded;
        }
        catch (error) {
            console.log("JWT verification error:", error);
            return null;
        }
    }),
};
exports.default = jwtServices;
