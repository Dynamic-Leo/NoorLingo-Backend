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

};

export default usersServices;
