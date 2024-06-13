import { User } from 'src/user/repository/entity/user.entity';
import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// 주문 내역
@Entity('ORDER')
export class Order extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  orderId: string;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mId: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  method: string;

  // 처음 결제 금액
  @Column({ type: 'integer', nullable: true })
  totalAmount: number;

  // 실제 결제된 금액 (취소 금액 반영)
  @Column({ type: 'integer' })
  balanceAmount: number;

  // 결제 처리 상태
  @Column({ type: 'varchar', length: 20, nullable: true })
  status: string;

  // 결제가 일어난 날짜와 시간 정보
  @Column({ type: 'timestamp without time zone', nullable: true })
  requestedAt: Date;

  // 결제 승인 날짜
  @Column({ type: 'timestamp without time zone', nullable: true })
  approvedAt: Date;

  // 부가세
  @Column({ type: 'integer', nullable: true })
  vat: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  orderName: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
