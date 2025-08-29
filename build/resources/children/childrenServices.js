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
const GameProgress_1 = __importDefault(require("../../entities/GameProgress"));
const lessonGameMap_1 = require("../../utils/lessonGameMap");
const gameProgressServices_1 = __importDefault(require("../gameProgress/gameProgressServices"));
const gameProgressValidator_1 = require("../gameProgress/gameProgressValidator");
const childrenRepo = db_1.default.getRepository(Children_1.default);
const gameProgressRepo = db_1.default.getRepository(GameProgress_1.default);
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
            relations: ["user", "avatar"],
            select: {
                id: true,
                name: true,
                ageGroup: true,
                fluencyLevel: true,
                gender: true,
                rewards: true,
                totalXP: true,
                badges: true,
                currentStreak: true,
                longestStreak: true,
                lastActivityDate: true,
                user: {
                    name: true,
                },
                avatar: {
                    id: true,
                    name: true,
                    imageUrl: true,
                },
            },
        });
        if (!child)
            return null;
        // This is crucial for it to work on CPanel and other production environments.
        if (child.avatar && child.avatar.imageUrl) {
            const baseUrl = process.env.APP_URL || "";
            const imageUrl = child.avatar.imageUrl.startsWith("/")
                ? child.avatar.imageUrl.substring(1)
                : child.avatar.imageUrl;
            child.avatar.imageUrl = `${baseUrl}/${imageUrl}`;
        }
        // 1. GET ALL COMPLETED GAMES FOR THIS CHILD
        const completedGames = yield gameProgressRepo.find({
            where: { child: { id: id }, isCompleted: true },
            select: ["lesson", "gameName"],
        });
        // 2. CALCULATE TOTALS FROM THE SOURCE OF TRUTH (lessonGameMap)
        const allLessons = Object.keys(lessonGameMap_1.lessonGameMap);
        const totalLessons = allLessons.length;
        const totalGames = Object.values(lessonGameMap_1.lessonGameMap).flat().length;
        const totalFluencyGames = gameProgressValidator_1.fluencyGames.length;
        // 3. CALCULATE CHILD-SPECIFIC STATS
        const gamesCompleted = completedGames.length;
        const gamesRemaining = totalGames - gamesCompleted;
        const completedFluencyGames = completedGames.filter((game) => gameProgressValidator_1.fluencyGames.includes(game.gameName)).length;
        const remainingFluencyGames = totalFluencyGames - completedFluencyGames;
        // 4. CALCULATE COMPLETED LESSONS (THE CORE LOGIC)
        let lessonsCompleted = 0;
        const completedGamesByLesson = completedGames.reduce((acc, game) => {
            if (!acc[game.lesson]) {
                acc[game.lesson] = new Set();
            }
            acc[game.lesson].add(game.gameName);
            return acc;
        }, {});
        // Check each lesson to see if it's complete
        for (const lessonName of allLessons) {
            const requiredGames = lessonGameMap_1.lessonGameMap[lessonName];
            const completedGamesInThisLesson = completedGamesByLesson[lessonName];
            if (completedGamesInThisLesson) {
                const isLessonComplete = requiredGames.every((game) => completedGamesInThisLesson.has(game));
                if (isLessonComplete) {
                    lessonsCompleted++;
                }
            }
        }
        const lessonsRemaining = totalLessons - lessonsCompleted;
        // 5. GET THE DETAILED GAME PROGRESS FOR THE RESPONSE
        const gameProgress = yield gameProgressServices_1.default.getGroupedProgressByChild(id);
        // 6. ASSEMBLE THE FINAL RESPONSE OBJECT
        return Object.assign(Object.assign({}, child), { stats: {
                totalLessons,
                lessonsCompleted,
                lessonsRemaining,
                totalGames,
                gamesCompleted,
                gamesRemaining,
                totalFluencyGames,
                completedFluencyGames,
                remainingFluencyGames,
            }, gameProgress });
    }),
    edit: (childId, data) => __awaiter(void 0, void 0, void 0, function* () {
        const child = yield childrenRepo.findOne({ where: { id: childId } });
        if (!child) {
            throw new Error("Child not found");
        }
        // Merge the new data into the existing child object
        Object.assign(child, data);
        // Save the updated child to the database
        const updatedChild = yield childrenRepo.save(child);
        return updatedChild;
    }),
    updateAvatar: (childId, avatarId) => __awaiter(void 0, void 0, void 0, function* () {
        const child = yield childrenRepo.findOne({ where: { id: childId } });
        if (!child)
            throw new Error("Child not found");
        child.avatarId = avatarId;
        return yield childrenRepo.save(child);
    }),
};
exports.default = childrenServices;
