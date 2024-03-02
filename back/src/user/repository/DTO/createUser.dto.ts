import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  userId: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  userName: string;
}
