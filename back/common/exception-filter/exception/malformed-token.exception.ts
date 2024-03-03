import { HttpException } from '@nestjs/common';

export class MalformedTokenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: 401,
        message: 'Malformed Token',
      },
      401,
    );
  }
}
