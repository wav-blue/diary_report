import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  mId: string;

  @IsNotEmpty()
  requestedAt: Date;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  balanceAmount: number;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  orderName: string;
}
