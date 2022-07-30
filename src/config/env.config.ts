export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV,
  port: +process.env.PORT,
  mongodb: process.env.MONGODB,
  defaultLimit: +process.env.DEFAULT_LIMIT,
});
