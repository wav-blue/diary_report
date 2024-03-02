import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    DiaryModule,
    PaymentsModule,
    LoggerModule,
  ],
})
export class AppModule {}
