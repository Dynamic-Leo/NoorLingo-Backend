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
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const Users_1 = __importDefault(require("../entities/Users"));
const jwtServices_1 = __importDefault(require("../utils/jwtServices"));
const db_1 = __importDefault(require("../db"));
exports.default = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.url.startsWith("/files") ||
        req.url.startsWith("/videos") ||
        req.url.startsWith("/images") ||
        req.url.startsWith("/logs") ||
        req.url.endsWith("refreshToken") ||
        req.url.endsWith("login") ||
        req.url.endsWith("signup") ||
        req.url.startsWith("/api/v1/test") ||
        req.url.endsWith("/bvs/verify") ||
        req.url.endsWith("/bvs/callback")) {
        return next();
    }
    let token;
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new appError_1.default("You are not logged in", 401, true));
    }
    const payload = yield jwtServices_1.default.authenticate(token);
    if (!payload) {
        return res.status(401).send({ message: "Invalid Token!" });
    }
    // ✅ get repository here, after DB connection is ready
    const userRepo = db_1.default.getRepository(Users_1.default);
    const currentUser = yield userRepo.findOne({
        where: { id: payload.userId },
    });
    if (!currentUser) {
        return next(new appError_1.default("User belonging to this token does not exist", 401, true));
    }
    req.user = currentUser;
    next();
}));
