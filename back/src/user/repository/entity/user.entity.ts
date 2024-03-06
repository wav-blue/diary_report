import { BaseEntity, PrimaryColumn, Column, Entity, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('USER')
export class User extends BaseEntity {
  @OneToOne(() => Customer, (customer: Customer) => customer.userId)
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

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
