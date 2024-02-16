import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from './service/user.service';
import { LoginUserDto } from './DTO/loginUser.dto';
import { CreateUserDto } from './DTO/createUser.dto';
import { GetUser } from 'common/decorator/get-user.decorator';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from 'common/guards/authGuard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
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
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res,
  ) {
    this.logger.log(`로그인 요청!`);
    const user = await this.authService.loginUser(loginUserDto);

    // Token 2개를 쿠키에 설정하는 과정 필요
    const { accessToken, refreshToken } = user;
    this.logger.debug(
      'controller에서 token string 확인 : ',
      accessToken,
      refreshToken,
    );
    res.cookie('accessToken', accessToken, {
      maxAge: 1 * 60 * 60 * 1000,
      signed: true,
    });

    return user;
  }

  @Get('/logout')
  logoutUser(@Res({ passthrough: true }) res: Response): any {
    // 토큰 파기
    res.cookie('accessToken', null, {
      maxAge: 0,
    });
    res.cookie('refreshToken', null, {
      maxAge: 0,
    });
    return '로그아웃 완료';
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  async currentUser(
    @GetUser() userId: string,
    @Req() req: Request,
  ): Promise<{ userId: string; userName: string }> {
    const user = await this.userService.getCurrentUserById(userId);
    const payload = {
      userId,
      userName: user.userName,
    };
    return payload;
  }
}
