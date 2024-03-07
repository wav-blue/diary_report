import { IsNotEmpty } from 'class-validator';

export class ReadCurrentUserDto {
  constructor(userId: string, userName: string) {
    this.userId = userId;
    this.userName = userName;
  }
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;
}
