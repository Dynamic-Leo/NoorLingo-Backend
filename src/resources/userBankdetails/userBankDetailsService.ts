import AppDataSource from "../../db";
import UserBankDetails from "../../entities/BankDetails";

const bankRepo = AppDataSource.getRepository(UserBankDetails);

const userBankDetailsServices = {
  rcreate: async (data: Partial<UserBankDetails>) => {
    const bankDetail = bankRepo.create(data);
    return await bankRepo.save(bankDetail);
  },

  getAll: async () => {
    return await bankRepo.find({
      where: { isActive: true },
      relations: ["user"],
    });
  },

  getByUserId: async (userId: number) => {
    return await bankRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["user"],
    });
  },
};

export default userBankDetailsServices;
