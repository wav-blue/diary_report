import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { IUserRepository } from './DAO/user.dao';
import { UserRepository } from './DAO/userCreate.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserLoginService } from './service/userLogin.service';
import { AccessTokenService } from 'src/auth/service/accessToken.service';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserLoginService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
