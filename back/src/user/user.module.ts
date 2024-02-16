import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { IUserRepository } from './DAO/user.dao';
import { UserRepository } from './DAO/userCreate.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
