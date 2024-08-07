import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserLoginService } from './service/userLogin.service';
import { UserCreateService } from './service/userCreate.service';
import { UserCurrentReadService } from './service/userCurrentRead.service';
import { UserSettingTokenService } from './service/userSettingToken.service';
import { IUserRepository } from './repository/DAO/user.repository';
import { UserRepository } from './repository/DAO/user.postgresql.repository';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserCurrentReadService,
    UserLoginService,
    UserSettingTokenService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [],
})
export class UserModule {}
