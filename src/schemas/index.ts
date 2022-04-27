import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().required().max(30),
  email: Joi.string().required().email().max(30),
  password: Joi.string().required().min(8),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});
