import { IsNotEmpty } from 'class-validator';

export class ReadClientKeyDto {
  constructor(customerKey: string, orderId: string) {
    this.clientKey = process.env.PAYMENTS_CLIENT_KEY;
    this.customerKey = customerKey;
    this.orderId = orderId;
  }

  @IsNotEmpty()
  clientKey: string;

  @IsNotEmpty()
  customerKey: string;

  @IsNotEmpty()
  orderId: string;
}
