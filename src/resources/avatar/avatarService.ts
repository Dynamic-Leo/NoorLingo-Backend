// src/resources/avatar/avatarService.ts
import AppDataSource from "../../db";
import Avatar from "../../entities/Avatar";

const avatarRepo = AppDataSource.getRepository(Avatar);

const avatarService = {
  getAll: async () => {
    const avatars = await avatarRepo.find();
    const baseUrl = process.env.APP_URL || "";

    return avatars.map(avatar => {
      if (avatar.imageUrl) {
        // Ensure imageUrl is relative to the base, then prepend full path
        // Example: if DB stores 'images/avatar.png', it becomes 'http://server/public/images/avatar.png'
        const relativePath = avatar.imageUrl.startsWith("public/")
          ? avatar.imageUrl
          : `public/${avatar.imageUrl}`; // Assuming images are under public/images

        return { ...avatar, imageUrl: `${baseUrl}/${relativePath}` };
      }
      return avatar;
    });
  },

  create: async (data: Partial<Avatar>) => {
    const avatar = avatarRepo.create(data);
    return await avatarRepo.save(avatar);
  },
};

export default avatarService;