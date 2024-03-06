import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserLoginService } from './service/userLogin.service';
import { IUserRepository } from './repository/DAO/user.repository';
import { CustomerCreateService } from './service/customerCreate.service';
import { CustomerReadService } from './service/customerRead.service';
import { TitleModule } from 'src/title/title.module';
import { UserRepository } from './repository/DAO/postgres-user.repository';
import { UserSettingTokenService } from './service/userSettingToken.service';
import { UserCreateService } from './service/userCreate.service';
import { UserGetCurrentService } from './service/userGetCurrent.service';

@Module({
  imports: [AuthModule, TitleModule, LoggerModule],
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserGetCurrentService,
    UserLoginService,
    UserSettingTokenService,
    CustomerReadService,
    CustomerCreateService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [CustomerReadService, CustomerCreateService],
})
export class UserModule {}
