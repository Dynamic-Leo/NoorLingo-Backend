import Joi from "joi";

const childrenValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    ageGroup: Joi.string().valid("2-3", "3-5", "5-10").required(),
    fluencyLevel: Joi.string().valid("Beginner", "Intermediate", "Advanced").required(),
    gender: Joi.string().valid("Boy", "Girl").required(),
    user: Joi.number().required(), // userId foreign key
  }),
};

export default childrenValidator;
   