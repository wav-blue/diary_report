import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Redis Queue
 */
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
