import { IsNotEmpty } from 'class-validator';

export class CreateVirtualAccountOrderDto {
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  bankCode: string;

  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  refundStatus: string;

  @IsNotEmpty()
  settlementStatus: string;

  @IsNotEmpty()
  refundReceiveAccountBankCode: string;

  @IsNotEmpty()
  refundReceiveAccountAccountNumber: string;

  @IsNotEmpty()
  refundReceiveAccountHolderName: string;

  @IsNotEmpty()
  dueDate: string;

  @IsNotEmpty()
  expired: boolean;
}
