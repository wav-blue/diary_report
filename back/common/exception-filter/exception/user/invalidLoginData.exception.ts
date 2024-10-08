import { HttpException } from '@nestjs/common';

export class InvalidLoginDataException extends HttpException {
  constructor() {
    super(
      // response
      'Wrong email or password',
      // status
      401,
    );
  }
}
