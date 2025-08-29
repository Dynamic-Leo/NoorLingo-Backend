import Joi from "joi";

const childrenValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    ageGroup: Joi.string().valid("2-3", "3-5", "5-10").required(),
    fluencyLevel: Joi.string().valid("Beginner", "Intermediate", "Advanced").required(),
    gender: Joi.string().valid("Boy", "Girl").required(),
    user: Joi.number().required(), // userId foreign key
    avatarId: Joi.number().required(), 
  }),

    edit: Joi.object({
    name: Joi.string().optional(),
    ageGroup: Joi.string().valid("2-3", "3-5", "5-10").optional(),
    fluencyLevel: Joi.string().valid("Beginner", "Intermediate", "Advanced").optional(),
    avatarId: Joi.number().optional(),
  }).min(1), // Require at least one key to be present
};

export default childrenValidator;
   