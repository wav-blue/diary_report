import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { LoggerModule } from './logger/logger.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMPostgresConfig } from './configs/typeorm-postgres.config';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMPostgresConfig),
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      isGlobal: true,
      ttl: 21600, // 시간(밀리초)
    }),
    UserModule,
    AuthModule,
    DiaryModule,
    PaymentsModule,
    LoggerModule,
  ],
})
export class AppModule {}
