import { IsNotEmpty, IsOptional } from 'class-validator';

export class CraeteBillingCardDto {
  @IsNotEmpty()
  amount: number;

  // 카드 번호
  @IsNotEmpty()
  number: string;

  // 할부 개월 수
  @IsNotEmpty()
  installmentPlanMonths: number;

  // 카드 종류
  @IsNotEmpty()
  cardType: string;

  // 카드 소유자 타입
  @IsNotEmpty()
  ownerType: string;

  // 카드 결제의 매입 상태
  @IsNotEmpty()
  acquireStatus: string;
}
