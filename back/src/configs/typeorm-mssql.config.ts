import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();
const dbConfig = config.get('db');
const mssqlConfig = config.get('mssql');

export const typeORMMssqlConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.MSSQL_HOSTNAME,
  port: mssqlConfig.port,
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DB_NAME,
  entities: [__dirname + '/../**/*.mssql.entity.{js, ts}'],
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  namingStrategy: new SnakeNamingStrategy(),
  options: {
    encrypt: false, // MSSQL-specific option
  },
};
