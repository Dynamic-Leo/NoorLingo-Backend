// src/modules/avatar/avatarService.ts
import AppDataSource from "../../db";
import Avatar from "../../entities/Avatar";

const avatarRepo = AppDataSource.getRepository(Avatar);

const avatarService = {
  getAll: async () => {
    return await avatarRepo.find();
  },

  create: async (data: Partial<Avatar>) => {
    const avatar = avatarRepo.create(data);
    return await avatarRepo.save(avatar);
  },
};

export default avatarService;
