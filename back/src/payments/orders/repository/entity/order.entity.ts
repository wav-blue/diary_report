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
@Entity('ORDERS')
export class Order extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  orderId: string;

  @Column({ type: 'varchar', length: 42, nullable: true })
  mId: string;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  requestedAt: Date;

  @Column({ type: 'integer' })
  balanceAmount: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  method: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  orderName: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
