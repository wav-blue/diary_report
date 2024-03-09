import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderCompleteDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  mId: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  orderName: string;

  // 처음 결제 금액
  @IsNotEmpty()
  totalAmount: number;

  // 실제 결제된 금액 (취소 금액 반영)
  @IsNotEmpty()
  balanceAmount: number;

  // 결제 처리 상태
  @IsNotEmpty()
  status: string;

  // 결제가 일어난 날짜와 시간 정보
  @IsNotEmpty()
  requestedAt: Date;

  // 결제 승인 날짜
  @IsOptional()
  approvedAt: Date;

  // 부가세
  @IsOptional()
  vat: number;
}
