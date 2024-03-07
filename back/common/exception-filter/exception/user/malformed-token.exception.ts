import { HttpException } from '@nestjs/common';

export class MalformedTokenException extends HttpException {
  constructor() {
    super(
      // response
      'Malformed Token',
      // status
      401,
    );
  }
}
