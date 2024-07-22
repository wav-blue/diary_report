import { IsNotEmpty } from 'class-validator';

export class AccessTokenRefreshDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}
