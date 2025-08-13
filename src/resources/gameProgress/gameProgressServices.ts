import AppDataSource from "../../db";
import GameProgress from "../../entities/GameProgress";
import Children from "../../entities/Children";
import { fluencyGames } from "./gameProgressValidator";

const gameProgressRepo = AppDataSource.getRepository(GameProgress);
const childrenRepo = AppDataSource.getRepository(Children);
type ScoreMapKey =
  | "Poor"
  | "Average"
  | "Good"
  | "Excellent"
  | "Slow"
  | "Normal"
  | "Fast"
  | "Fair"
  | "Varied"
  | "Expressive";
const gameProgressService = {
  createOrUpdate: async (data: any) => {
    const { childId, lesson, gameName } = data;

    const child = await childrenRepo.findOne({ where: { id: childId } });
    if (!child) throw new Error("Child not found");

    let xpEarned = 0;
    let score = 0;

    let progress = await gameProgressRepo.findOne({
      where: { child: { id: childId }, lesson, gameName },
    });

    const isFirstTimeCompletion = !progress;

    if (fluencyGames.includes(gameName)) {
      const { pronunciation, speed, intonation, completed } = data;

      const scoreMap: Record<ScoreMapKey, number> = {
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

      const totalPoints =
        scoreMap[pronunciation as ScoreMapKey] +
        scoreMap[speed as ScoreMapKey] +
        scoreMap[intonation as ScoreMapKey];

      score = Math.round((totalPoints / 12) * 100);

      if (score >= 90) xpEarned = 20;
      else if (score >= 75) xpEarned = 15;
      else if (score >= 50) xpEarned = 10;
      else xpEarned = 5;

      if (progress) {
        progress.isCompleted = completed ?? progress.isCompleted;
        progress.score = score;
        progress.xpEarned = xpEarned;
        progress.pronunciation = pronunciation;
        progress.speed = speed;
        progress.intonation = intonation;
        progress.attempts += 1;
      } else {
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
    } else if (gameName === "Pollution Police" || gameName === "Masdar City Summary") {
      const { paragraph } = data;
      xpEarned = 20;
      score = 100;
      if (progress) {
        progress.isCompleted = true;
        progress.score = score;
        progress.xpEarned = xpEarned;
        progress.paragraph = paragraph;
        progress.attempts += 1;
      } else {
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
    } else {
      const { completed, correctAnswers, totalQuestions } = data;
      score = Math.round((correctAnswers / totalQuestions) * 100);

      if (score >= 90) xpEarned = 20;
      else if (score >= 75) xpEarned = 15;
      else if (score >= 50) xpEarned = 10;
      else xpEarned = 5;

      if (progress) {
        progress.isCompleted = completed ?? progress.isCompleted;
        progress.score = score;
        progress.xpEarned = xpEarned;
        progress.attempts += 1;
      } else {
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
    if (isFirstTimeCompletion) child.rewards += 1;

    const completedGamesInLesson = await gameProgressRepo.count({
      where: { child: { id: childId }, lesson, isCompleted: true },
    });

    child.lessonsCompleted = completedGamesInLesson;
    if (!child.differentLessons.includes(lesson)) {
      child.differentLessons.push(lesson);
    }

    await childrenRepo.save(child);
    return await gameProgressRepo.save(progress);
  },

  getByChild: async (childId: number) => {
    return await gameProgressRepo.find({
      where: { child: { id: childId } },
      order: { updatedDate: "DESC" },
    });
  },

  getGroupedProgressByChild: async (childId: number) => {
    const allProgress = await gameProgressRepo.find({
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

    const grouped: Record<string, any[]> = {};
    for (const item of allProgress) {
      if (!grouped[item.lesson]) grouped[item.lesson] = [];
      grouped[item.lesson].push(item);
    }

    return Object.entries(grouped).map(([lesson, games]) => ({
      lesson,
      games,
    }));
  },
};

export default gameProgressService;
