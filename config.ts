import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      type: process.env.DATABASE_TYPE,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
