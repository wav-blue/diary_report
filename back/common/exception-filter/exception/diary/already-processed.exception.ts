import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyProcessedException extends HttpException {
  constructor() {
    super(
      // response
      'Job already being processed',
      // status
      HttpStatus.CONFLICT, // 409
    );
  }
}
