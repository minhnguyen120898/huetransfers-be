import * as Joi from 'joi';

export const validationSchema = Joi.object({
  API_PORT: Joi.number().port().default(3000),
  HOST: Joi.string().default('0.0.0.0'),
  API_PREFIX: Joi.string().default('/api/v1'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  CORS_ORIGIN: Joi.string().allow('*').optional(),
  SWAGGER_ENABLE: Joi.string().valid('0', '1').default('1'),
  JWT_SECRET: Joi.string().min(32).optional(),
  JWT_ISSUER: Joi.string().optional(),
  HEALTH_TOKEN: Joi.string().optional(),
});
