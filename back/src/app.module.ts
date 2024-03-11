import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { LoggerModule } from './logger/logger.module';
// import { typeORMConfig } from './configs/typeorm.config';
import { typeORMPostgresConfig } from './configs/typeorm-postgres.config';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMPostgresConfig),
    UserModule,
    AuthModule,
    DiaryModule,
    PaymentsModule,
    BillingModule,
    LoggerModule,
  ],
})
export class AppModule {}
