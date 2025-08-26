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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../db/index"));
const Users_1 = __importDefault(require("../../entities/Users"));
const usersRepo = index_1.default.getRepository(Users_1.default);
const usersServices = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const user = usersRepo.create(data);
        return yield usersRepo.save(user);
    }),
    getByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield usersRepo.findOne({ where: { email } });
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const all = yield usersRepo.find({ where: { isActive: true } });
        return all;
    }),
    getSingleWithChildren: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = index_1.default.getRepository(Users_1.default);
        const user = yield userRepo.findOne({
            where: { id: userId },
            relations: ["children"],
        });
        if (!user)
            return null;
        // Destructure to remove unwanted fields
        const { password, createdDate, updatedDate } = user, sanitizedUser = __rest(user, ["password", "createdDate", "updatedDate"]);
        return sanitizedUser;
    }),
    findOrCreateByGoogle: (googleId, email, name) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Find user by googleId
        let user = yield usersRepo.findOne({ where: { googleId } });
        if (user) {
            return user;
        }
        // 2. If not found, find by email to link accounts
        user = yield usersRepo.findOne({ where: { email } });
        if (user) {
            user.googleId = googleId;
            yield usersRepo.save(user);
            return user;
        }
        // 3. If no user exists, create a new one
        const newUser = usersRepo.create({
            googleId,
            email,
            name,
            role: "user", // Default role for new Google users
        });
        return yield usersRepo.save(newUser);
    }),
};
exports.default = usersServices;
