import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import {ConfigType} from '@nestjs/config';
import { config } from 'dotenv';
import { enviroments } from 'enviroments';
config({ path: enviroments[process.env.NODE_ENV] });

import configFile from 'config';

//Usando configService
// const configService = new ConfigService();

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('DATABASE_HOST'),
//   port: parseInt(configService.get<string>('DATABASE_PORT'), 5432),
//   username: configService.get<string>('DATABASE_USER'),
//   password: configService.get<string>('DATABASE_PASSWORD'),
//   database: configService.get<string>('DATABASE_NAME'),
//   synchronize: false,
//   entities: ['**/*.entity.ts'],
//   migrations: ['src/data/migrations/*.ts'],
//   migrationsRun: false,
//   logging: true,
// });

//Usando ConfigType
const configuration = configFile();
const AppDataSource = new DataSource({
  type:'postgres',
  host:configuration.database.host,
  port:parseInt(configuration.database.port),
  username:configuration.database.username,
  password:configuration.database.password,
  database:configuration.database.database,
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/data/migrations/*.ts'],
  migrationsRun: false,
  logging: true,
})

export default AppDataSource;
