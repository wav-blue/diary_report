import { HttpException } from '@nestjs/common';

export class DuplicatePurchaseReqestException extends HttpException {
  constructor() {
    super(
      // response
      'Duplicate purchase request',
      // status
      409,
    );
  }
}
