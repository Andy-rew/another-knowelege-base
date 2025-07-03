import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export type JwtAccessConfig = {
  accessSecret: string;
  accessExpireTimeMinutes: string;
};

export type JwtRefreshConfig = {
  refreshSecret: string;
  refreshExpireTimeMinutes: string;
};

export type Env = 'local' | 'dev' | 'stage' | 'prod' | 'test';

export type Server = {
  port: number;
  env: Env;
};

export type Database = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type Application = {
  passwordLength: number;
};

export type Configuration = {
  jwtAccess: JwtAccessConfig;
  jwtRefresh: JwtRefreshConfig;
  server: Server;
  database: Database;
  application: Application;
};

export const loadConfiguration = (): Configuration =>
  <Configuration>{
    jwtAccess: {
      accessSecret: process.env.JWT_ACCESS_SECRET_KEY,
      accessExpireTimeMinutes: process.env.JWT_ACCESS_EXPIRE_TIME_MINUTES,
    },
    jwtRefresh: {
      refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
      refreshExpireTimeMinutes: process.env.JWT_REFRESH_EXPIRE_TIME_MINUTES,
    },
    server: {
      port: Number(process.env.PORT),
      env: process.env.ENVIRONMENT_NAME as Env,
    },
    database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
    application: {
      passwordLength: Number(process.env.PASSWORD_LENGTH),
    },
  };

export const CONFIGS: { [K in keyof Configuration]: K } = {
  jwtAccess: 'jwtAccess',
  jwtRefresh: 'jwtRefresh',
  server: 'server',
  database: 'database',
  application: 'application',
};
