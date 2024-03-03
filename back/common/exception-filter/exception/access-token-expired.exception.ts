import { HttpException } from '@nestjs/common';

export class AccessTokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: 419,
        message: 'Access Token Expired',
      },
      419,
    );
  }
}
