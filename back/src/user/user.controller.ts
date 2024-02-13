import { Body, Controller, Get, Post } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from './service/userService';
import { CreateUserDto } from './DTO/userCreate.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: MyLogger,
  ) {
    // this.logger.setContext(UserController.name);
  }
  // 회원가입
  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto): any {
    this.logger.log(`회원가입 요청!`);
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  loginUser(): any {}

  @Get('/logout')
  logoutUser(): any {}

  @Post('/accessToken')
  createAccessToken(): any {}
}
