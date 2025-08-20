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
const db_1 = __importDefault(require("../../db"));
const Children_1 = __importDefault(require("../../entities/Children"));
const gameProgressServices_1 = __importDefault(require("../gameProgress/gameProgressServices"));
const childrenRepo = db_1.default.getRepository(Children_1.default);
const childrenServices = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const child = childrenRepo.create(data);
        return yield childrenRepo.save(child);
    }),
    getByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield childrenRepo.find({
            where: { user: { id: userId } },
            relations: ["user"],
        });
    }),
    getById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const child = yield childrenRepo.findOne({
            where: { id },
            relations: ["user"],
            select: {
                id: true,
                name: true,
                ageGroup: true,
                fluencyLevel: true,
                gender: true,
                rewards: true,
                totalXP: true,
                badges: true,
                lessonsCompleted: true,
                remainingLessons: true,
                differentLessons: true,
                user: {
                    name: true,
                },
            },
        });
        if (!child)
            return null;
        // 📦 Get grouped game progress
        const gameProgress = yield gameProgressServices_1.default.getGroupedProgressByChild(id);
        return Object.assign(Object.assign({}, child), { gameProgress });
    }),
};
exports.default = childrenServices;
