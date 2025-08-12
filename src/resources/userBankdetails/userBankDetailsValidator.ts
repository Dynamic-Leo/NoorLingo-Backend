import Joi from "joi";

const userBankDetailsValidator = {
  create: Joi.object({
    user: Joi.object({ id: Joi.number().required() }).required(),
    bankName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    accountHolderName: Joi.string().required(),
    iban: Joi.string().optional(),
    swiftCode: Joi.string().optional(),
    branchCode: Joi.string().optional(),
  }),
};

export default userBankDetailsValidator;
