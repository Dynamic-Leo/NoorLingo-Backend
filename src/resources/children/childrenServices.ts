import AppDataSource from "../../db";
import Children from "../../entities/Children";
import gameProgressService from "../gameProgress/gameProgressServices";

const childrenRepo = AppDataSource.getRepository(Children);

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

    if (!child) return null;

    // 📦 Get grouped game progress
    const gameProgress = await gameProgressService.getGroupedProgressByChild(id);

    return {
      ...child,
      gameProgress,
    };
  },

};

export default childrenServices;
