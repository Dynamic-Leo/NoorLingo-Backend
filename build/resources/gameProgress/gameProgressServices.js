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
const GameProgress_1 = __importDefault(require("../../entities/GameProgress"));
const Children_1 = __importDefault(require("../../entities/Children"));
const gameProgressValidator_1 = require("./gameProgressValidator");
const gameProgressRepo = db_1.default.getRepository(GameProgress_1.default);
const childrenRepo = db_1.default.getRepository(Children_1.default);
const gameProgressService = {
    createOrUpdate: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { childId, lesson, gameName } = data;
        const child = yield childrenRepo.findOne({ where: { id: childId } });
        if (!child)
            throw new Error("Child not found");
        let xpEarned = 0;
        let score = 0;
        let progress = yield gameProgressRepo.findOne({
            where: { child: { id: childId }, lesson, gameName },
        });
        const isFirstTimeCompletion = !progress;
        if (gameProgressValidator_1.fluencyGames.includes(gameName)) {
            const { pronunciation, speed, intonation, completed } = data;
            const scoreMap = {
                Poor: 1,
                Average: 2,
                Good: 3,
                Excellent: 4,
                Slow: 1,
                Normal: 2,
                Fast: 3,
                Fair: 1,
                Varied: 2,
                Expressive: 3,
            };
            const totalPoints = scoreMap[pronunciation] +
                scoreMap[speed] +
                scoreMap[intonation];
            score = Math.round((totalPoints / 12) * 100);
            if (score >= 90)
                xpEarned = 20;
            else if (score >= 75)
                xpEarned = 15;
            else if (score >= 50)
                xpEarned = 10;
            else
                xpEarned = 5;
            if (progress) {
                progress.isCompleted = completed !== null && completed !== void 0 ? completed : progress.isCompleted;
                progress.score = score;
                progress.xpEarned = xpEarned;
                progress.pronunciation = pronunciation;
                progress.speed = speed;
                progress.intonation = intonation;
                progress.attempts += 1;
            }
            else {
                progress = gameProgressRepo.create({
                    child,
                    lesson,
                    gameName,
                    isCompleted: completed,
                    score,
                    xpEarned,
                    pronunciation,
                    speed,
                    intonation,
                    attempts: 1,
                });
            }
        }
        else if (gameName === "Pollution Police" || gameName === "Masdar City Summary") {
            const { paragraph } = data;
            xpEarned = 20;
            score = 100;
            if (progress) {
                progress.isCompleted = true;
                progress.score = score;
                progress.xpEarned = xpEarned;
                progress.paragraph = paragraph;
                progress.attempts += 1;
            }
            else {
                progress = gameProgressRepo.create({
                    child,
                    lesson,
                    gameName,
                    isCompleted: true,
                    score,
                    xpEarned,
                    paragraph,
                    attempts: 1,
                });
            }
        }
        else {
            const { completed, correctAnswers, totalQuestions } = data;
            score = Math.round((correctAnswers / totalQuestions) * 100);
            if (score >= 90)
                xpEarned = 20;
            else if (score >= 75)
                xpEarned = 15;
            else if (score >= 50)
                xpEarned = 10;
            else
                xpEarned = 5;
            if (progress) {
                progress.isCompleted = completed !== null && completed !== void 0 ? completed : progress.isCompleted;
                progress.score = score;
                progress.xpEarned = xpEarned;
                progress.attempts += 1;
            }
            else {
                progress = gameProgressRepo.create({
                    child,
                    lesson,
                    gameName,
                    isCompleted: completed,
                    score,
                    xpEarned,
                    attempts: 1,
                });
            }
        }
        child.totalXP += xpEarned;
        if (isFirstTimeCompletion)
            child.rewards += 1;
        const completedGamesInLesson = yield gameProgressRepo.count({
            where: { child: { id: childId }, lesson, isCompleted: true },
        });
        child.lessonsCompleted = completedGamesInLesson;
        if (!child.differentLessons.includes(lesson)) {
            child.differentLessons.push(lesson);
        }
        yield childrenRepo.save(child);
        return yield gameProgressRepo.save(progress);
    }),
    getByChild: (childId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield gameProgressRepo.find({
            where: { child: { id: childId } },
            order: { updatedDate: "DESC" },
        });
    }),
    getGroupedProgressByChild: (childId) => __awaiter(void 0, void 0, void 0, function* () {
        const allProgress = yield gameProgressRepo.find({
            where: { child: { id: childId } },
            select: [
                "lesson",
                "gameName",
                "isCompleted",
                "score",
                "attempts",
                "pronunciation",
                "speed",
                "intonation",
            ],
            order: { updatedDate: "DESC" },
        });
        const grouped = {};
        for (const item of allProgress) {
            if (!grouped[item.lesson])
                grouped[item.lesson] = [];
            grouped[item.lesson].push(item);
        }
        return Object.entries(grouped).map(([lesson, games]) => ({
            lesson,
            games,
        }));
    }),
};
exports.default = gameProgressService;
