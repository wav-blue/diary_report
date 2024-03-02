import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

// 주문 내역
@Entity('ORDERS')
export class Order extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  orderId: string;

  @Column({ type: 'varchar', length: 42 })
  mId: string;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'datetime' })
  requestedAt: Date;

  @Column({ type: 'varchar', length: 100 })
  customerName: string;

  @Column({ type: 'number' })
  balanceAmount: number;

  @Column({ type: 'varchar', length: 50 })
  method: string;

  @Column({ type: 'varchar', length: 100 })
  orderName: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
