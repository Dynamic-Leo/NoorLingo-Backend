import AppDataSource from "../../db/index";
import Users from "../../entities/Users";

const usersRepo = AppDataSource.getRepository(Users);

const usersServices = {
  create: async (data: Partial<Users>) => {
    const user = usersRepo.create(data);
    return await usersRepo.save(user);
  },

  getByEmail: async (email: string) => {
    return await usersRepo.findOne({ where: { email } });
  },

  getAll: async () => {
    const all = await usersRepo.find({ where: { isActive: true } });
    return all;
  },

  getSingleWithChildren: async (userId: number) => {
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["children"],
    });

    if (!user) return null;

    // Destructure to remove unwanted fields
    const { password, createdDate, updatedDate, ...sanitizedUser } = user;
    return sanitizedUser;
  },
  findOrCreateByGoogle: async (
    googleId: string,
    email: string,
    name: string
  ) => {
    // 1. Find user by googleId
    let user = await usersRepo.findOne({ where: { googleId } });
    if (user) {
      return user;
    }

    // 2. If not found, find by email to link accounts
    user = await usersRepo.findOne({ where: { email } });
    if (user) {
      user.googleId = googleId;
      await usersRepo.save(user);
      return user;
    }

    // 3. If no user exists, create a new one
    const newUser = usersRepo.create({
      googleId,
      email,
      name,
      role: "user", // Default role for new Google users
    });

    return await usersRepo.save(newUser);
  },
};

export default usersServices;
