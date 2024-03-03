import { HttpException } from '@nestjs/common';

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: 419,
        message: 'Refresh Token Expired',
      },
      419,
    );
  }
}
