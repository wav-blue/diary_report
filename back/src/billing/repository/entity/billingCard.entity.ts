import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// 주문 카드 정보
@Entity('BILLING_CARD')
export class BillingCard extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  orderId: string;

  @Column({ type: 'integer' })
  amount: number;

  // 카드 번호
  @Column({ type: 'varchar', length: 100, nullable: true })
  number: string;

  // 할부 개월 수
  @Column({ type: 'integer' })
  installmentPlanMonths: number;

  // 카드 종류
  @Column({ type: 'varchar', length: 100, nullable: true })
  cardType: string;

  // 카드 소유자 타입
  @Column({ type: 'varchar', length: 100, nullable: true })
  ownerType: string;

  // 카드 결제의 매입 상태
  @Column({ type: 'varchar', length: 100, nullable: true })
  acquireStatus: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
