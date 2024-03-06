import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserLoginService } from './service/userLogin.service';
import { IUserRepository } from './repository/DAO/user.repository';
import { UserRepository } from './repository/DAO/mysql-user.repository';
import { CustomerCreateService } from './service/customerCreate.service';
import { CustomerReadService } from './service/customerRead.service';
import { TitleModule } from 'src/title/title.module';

@Module({
  imports: [AuthModule, TitleModule, LoggerModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserLoginService,
    CustomerReadService,
    CustomerCreateService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [CustomerReadService, CustomerCreateService],
})
export class UserModule {}
