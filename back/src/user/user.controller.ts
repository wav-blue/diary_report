import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from './service/userService';
import { LoginUserDto } from './DTO/loginUser.dto';
import { UserLoginService } from './service/userLoginService';
import { CreateUserDto } from './DTO/createUser.dto';
import { Response } from 'express';
import { GetUser } from 'common/decorator/get-user.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userLoginService: UserLoginService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserController.name);
  }
  // 회원가입
  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto): any {
    this.logger.log(`회원가입 요청!`);
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    this.logger.log(`로그인 요청!`);
    const user = await this.userLoginService.loginUser(loginUserDto);

    const { accessToken, refreshToken } = user;

    res.cookie('accessToken', accessToken, {
      maxAge: 1 * 60 * 60 * 1000,
      signed: true,
    });

    return user;
  }

  @Get('/logout')
  logoutUser(@Res() res: Response): any {
    // 토큰 파기
    res.cookie('accessToken', null, {
      maxAge: 0,
    });
    res.send('로그아웃 완료');
  }

  @Get('/current')
  async currentUser(
    @GetUser() userId: string,
  ): Promise<{ userId: string; userName: string }> {
    if (!userId) {
      throw new NotFoundException('Access Token 없음');
    }
    const userName = await this.userService.getUsernameById(userId);
    const user = {
      userId,
      userName,
    };
    return user;
  }

  @Post('/accessToken')
  createAccessToken(): any {}
}
