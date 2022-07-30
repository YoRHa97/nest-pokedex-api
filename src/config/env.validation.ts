import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().required(),
});
