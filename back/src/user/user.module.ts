import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './service/userService';
import { UserRepository } from './DAO/user.repository';

@Module({
  imports: [LoggerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
