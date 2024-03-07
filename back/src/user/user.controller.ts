import { Body, Controller, Get, Post } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { LoginUserDto } from './repository/DTO/loginUser.dto';
import { CreateUserDto } from './repository/DTO/createUser.dto';
import { GetUser } from 'common/decorator/get-user.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './repository/entity/user.entity';
import { UserLoginService } from './service/userLogin.service';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { UserCreateService } from './service/userCreate.service';
import { ReadLoginUserDto } from './repository/DTO/readLoginUser.dto';
import { ReadCurrentUserDto } from './repository/DTO/readCurrentUser.dto';
import { UserCurrentReadService } from './service/userCurrentRead.service';

@Controller('users')
@ApiTags('유저 API')
export class UserController {
  constructor(
    private readonly userCurrentReadService: UserCurrentReadService,
    private readonly userCreateService: UserCreateService,
    private readonly userLoginService: UserLoginService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserController.name);
  }
  // 회원가입
  @Post('/register')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저 데이터를 생성한다',
  })
  @ApiCreatedResponse({ description: '유저데이터', type: User })
  createUser(@Body() createUserDto: CreateUserDto): Promise<ReadLoginUserDto> {
    this.logger.log(`회원가입 요청!`);
    const user = this.userCreateService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 여부를 확인하고 관련 jwt 토큰 값을 셋팅',
  })
  @ApiCreatedResponse({ description: '로그인된 유저의 데이터' })
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ReadLoginUserDto> {
    this.logger.log(`로그인 요청!`);
    const user = await this.userLoginService.loginUser(loginUserDto);

    return user;
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '현재 유저 확인 API',
    description: 'access Token 값에 해당되는 유저 데이터를 반환한다',
  })
  @ApiCreatedResponse({ description: '로그인 유저데이터', type: User })
  async currentUser(@GetUser() userId: string): Promise<ReadCurrentUserDto> {
    const user = await this.userCurrentReadService.getCurrentUserById(userId);
    const payload = {
      userId,
      userName: user.userName,
    };
    return payload;
  }
}
