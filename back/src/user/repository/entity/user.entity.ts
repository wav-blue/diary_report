import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { TitleItem } from 'src/title/repository/entity/titleItem.entity';
import { Diary } from 'src/diary/repository/entity/diary.entity';
import { Order } from 'src/payments/orders/repository/entity/order.entity';

@Entity('USER')
export class User extends BaseEntity {
  @OneToMany(() => Diary, (diary: Diary) => diary.userId)
  @OneToMany(() => Order, (order: Order) => order.userId)
  @OneToOne(() => Customer, (customer: Customer) => customer.userId)
  @OneToMany(() => TitleItem, (titleItem: TitleItem) => titleItem.userId)
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  userName: string;

  @Column({ type: 'varchar', length: 42, default: null })
  customerKey: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
