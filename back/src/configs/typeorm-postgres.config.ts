import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();
const dbConfig = config.get('db');
const postgresConfig = config.get('postgres');

export const typeORMPostgresConfig: TypeOrmModuleOptions = {
  type: postgresConfig.type,
  host: process.env.POSTGRES_HOSTNAME,
  port: postgresConfig.port,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  namingStrategy: new SnakeNamingStrategy(),
};
