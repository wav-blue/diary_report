import { IsNotEmpty } from 'class-validator';

export class UpdateOrderCompleteDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  mId: string;

  @IsNotEmpty()
  requestedAt: Date;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  balanceAmount: number;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  orderName: string;
}