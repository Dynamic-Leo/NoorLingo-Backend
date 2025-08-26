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
// src/modules/avatar/avatarService.ts
const db_1 = __importDefault(require("../../db"));
const Avatar_1 = __importDefault(require("../../entities/Avatar"));
const avatarRepo = db_1.default.getRepository(Avatar_1.default);
const avatarService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield avatarRepo.find();
    }),
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const avatar = avatarRepo.create(data);
        return yield avatarRepo.save(avatar);
    }),
};
exports.default = avatarService;
