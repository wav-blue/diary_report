import { IsNotEmpty } from 'class-validator';

export class ReadLoginUserDto {
  constructor(
    userId: string,
    userName: string,
    accessToken: string,
    refreshToken: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}
