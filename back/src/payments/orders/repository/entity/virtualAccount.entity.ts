import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

// 가상계좌 내역
@Entity('VIRTUAL_ACCOUNT_ORDER')
export class VirtualAccountOrder extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  orderId: string;

  @Column({ type: 'varchar', length: 100 })
  customerName: string;

  @Column({ type: 'varchar', length: 50 })
  accountType: string;

  @Column({ type: 'varchar', length: 100 })
  accountNumber: string;

  @Column({ type: 'varchar', length: 50 })
  bankCode: string;

  @Column({ type: 'varchar', length: 50 })
  refundStatus: string;

  @Column({ type: 'varchar', length: 50 })
  settlementStatus: string;

  @Column({ type: 'varchar', length: 50 })
  refundReceiveAccountBankCode: string;

  @Column({ type: 'varchar', length: 100 })
  refundReceiveAccountAccountNumber: string;

  @Column({ type: 'varchar', length: 50 })
  refundReceiveAccountHolderName: string;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column()
  expired: boolean;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
