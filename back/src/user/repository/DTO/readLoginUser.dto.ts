import { IsNotEmpty } from 'class-validator';

export class ReadLoginUserDto {
  constructor(userId: string, userName: string, accessToken: string) {
    this.userId = userId;
    this.userName = userName;
    this.accessToken = accessToken;
  }
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  accessToken: string;
}
