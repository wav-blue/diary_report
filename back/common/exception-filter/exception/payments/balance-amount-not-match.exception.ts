import { HttpException, HttpStatus } from '@nestjs/common';

export class BalanceAmountNotMatchException extends HttpException {
  constructor() {
    super(
      // response
      'Balance amount does not match',
      // status
      HttpStatus.BAD_REQUEST, // 400
    );
  }
}
