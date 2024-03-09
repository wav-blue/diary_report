import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVirtualAccountDto {
  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  bankCode: string;

  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  expired: boolean;

  @IsNotEmpty()
  settlementStatus: string;

  @IsNotEmpty()
  refundStatus: string;

  @IsOptional()
  refundReceiveAccount: string;
}
