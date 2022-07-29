import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .required(),
  ENVIRONMENT: Joi.string()
    .valid('development', 'production', 'staging')
    .required(),
  PORT: Joi.number().port().required(),
  CORS_CLIENT_URLS: Joi.string().required(),
  SELF_API_URL: Joi.string().required(),
});

export const configuration = () => ({
  env: process.env.NODE_ENV,
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 10),
  corsClientUrls: process.env.CORS_CLIENT_URLS,
  selfApiUrl: process.env.SELF_API_URL,
});

export const validationOptions = {
  abortEarly: true,
};
