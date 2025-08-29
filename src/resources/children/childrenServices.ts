import AppDataSource from "../../db";
import Children from "../../entities/Children";
import GameProgress from "../../entities/GameProgress";
import { lessonGameMap } from "../../utils/lessonGameMap";
import gameProgressService from "../gameProgress/gameProgressServices";
import { fluencyGames } from "../gameProgress/gameProgressValidator";

const childrenRepo = AppDataSource.getRepository(Children);
const gameProgressRepo = AppDataSource.getRepository(GameProgress);

const childrenServices = {
  create: async (data: Partial<Children>) => {
    const child = childrenRepo.create(data);
    return await childrenRepo.save(child);
  },

  getByUserId: async (userId: number) => {
    return await childrenRepo.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  },

  getById: async (id: number) => {
    const child = await childrenRepo.findOne({
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

    if (!child) return null;

    // This is crucial for it to work on CPanel and other production environments.
    if (child.avatar && child.avatar.imageUrl) {
      const baseUrl = process.env.APP_URL || "";
      const imageUrl = child.avatar.imageUrl.startsWith("/")
        ? child.avatar.imageUrl.substring(1)
        : child.avatar.imageUrl;

      child.avatar.imageUrl = `${baseUrl}/${imageUrl}`;
    }
    // 1. GET ALL COMPLETED GAMES FOR THIS CHILD
    const completedGames = await gameProgressRepo.find({
      where: { child: { id: id }, isCompleted: true },
      select: ["lesson", "gameName"],
    });

    // 2. CALCULATE TOTALS FROM THE SOURCE OF TRUTH (lessonGameMap)
    const allLessons = Object.keys(lessonGameMap);
    const totalLessons = allLessons.length;
    const totalGames = Object.values(lessonGameMap).flat().length;
    const totalFluencyGames = fluencyGames.length;

    // 3. CALCULATE CHILD-SPECIFIC STATS
    const gamesCompleted = completedGames.length;
    const gamesRemaining = totalGames - gamesCompleted;

    const completedFluencyGames = completedGames.filter((game) =>
      fluencyGames.includes(game.gameName)
    ).length;
    const remainingFluencyGames = totalFluencyGames - completedFluencyGames;

    // 4. CALCULATE COMPLETED LESSONS (THE CORE LOGIC)
    let lessonsCompleted = 0;
    const completedGamesByLesson = completedGames.reduce((acc, game) => {
      if (!acc[game.lesson]) {
        acc[game.lesson] = new Set();
      }
      acc[game.lesson].add(game.gameName);
      return acc;
    }, {} as Record<string, Set<string>>);

    // Check each lesson to see if it's complete
    for (const lessonName of allLessons) {
      const requiredGames = lessonGameMap[lessonName];
      const completedGamesInThisLesson = completedGamesByLesson[lessonName];

      if (completedGamesInThisLesson) {
        const isLessonComplete = requiredGames.every((game) =>
          completedGamesInThisLesson.has(game)
        );
        if (isLessonComplete) {
          lessonsCompleted++;
        }
      }
    }
    const lessonsRemaining = totalLessons - lessonsCompleted;

    // 5. GET THE DETAILED GAME PROGRESS FOR THE RESPONSE
    const gameProgress = await gameProgressService.getGroupedProgressByChild(
      id
    );

    // 6. ASSEMBLE THE FINAL RESPONSE OBJECT
    return {
      ...child,
      stats: {
        totalLessons,
        lessonsCompleted,
        lessonsRemaining,
        totalGames,
        gamesCompleted,
        gamesRemaining,
        totalFluencyGames,
        completedFluencyGames,
        remainingFluencyGames,
      },
      gameProgress,
    };
  },

  edit: async (childId: number, data: Partial<Children>) => {
    const child = await childrenRepo.findOne({ where: { id: childId } });

    if (!child) {
      throw new Error("Child not found");
    }

    // Merge the new data into the existing child object
    Object.assign(child, data);

    // Save the updated child to the database
    const updatedChild = await childrenRepo.save(child);
    return updatedChild;
  },

  updateAvatar: async (childId: number, avatarId: number) => {
    const child = await childrenRepo.findOne({ where: { id: childId } });
    if (!child) throw new Error("Child not found");

    child.avatarId = avatarId;
    return await childrenRepo.save(child);
  },
};

export default childrenServices;
