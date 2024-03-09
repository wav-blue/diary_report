import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/*
Column 정보
https://docs.tosspayments.com/reference#%EC%A0%95%EC%82%B0
*/

// 가상계좌 내역
@Entity('VIRTUAL_ACCOUNT')
export class VirtualAccount extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  orderId: string;

  // 가상계좌 타입
  @Column({ type: 'varchar', length: 10 })
  accountType: string;

  // 발급된 계좌 번호
  @Column({ type: 'varchar', length: 100 })
  accountNumber: string;

  // 가상계좌 은행 숫자 코드
  @Column({ type: 'varchar', length: 10 })
  bankCode: string;

  // 구매자명
  @Column({ type: 'varchar', length: 50 })
  customerName: string;

  // 입금 기한
  @Column({ type: 'timestamp without time zone' })
  dueDate: Date;

  // 가상계좌 만료 여부
  @Column()
  expired: boolean;

  // 정산 상태
  @Column({ type: 'varchar', length: 50 })
  settlementStatus: string;

  // 환불 처리 상태
  @Column({ type: 'varchar', length: 20 })
  refundStatus: string;

  // 고객의 환불 계좌 정보
  @Column({ type: 'varchar', length: 100, nullable: true })
  refundReceiveAccount: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
