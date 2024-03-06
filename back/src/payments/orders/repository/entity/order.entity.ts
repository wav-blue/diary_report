import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

// 주문 내역
@Entity('ORDERS')
export class Order extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  orderId: string;

  @Column({ type: 'varchar', length: 42 })
  mId: string;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'timestamp without time zone' })
  requestedAt: Date;

  @Column({ type: 'integer' })
  balanceAmount: number;

  @Column({ type: 'varchar', length: 50 })
  method: string;

  @Column({ type: 'varchar', length: 100 })
  orderName: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
