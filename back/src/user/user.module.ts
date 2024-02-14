import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './service/userService';
import { IUserRepository } from './DAO/user.dao';
import { UserRepository } from './DAO/userCreate.repository';

@Module({
  imports: [LoggerModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
