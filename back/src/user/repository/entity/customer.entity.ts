import { BaseEntity, PrimaryColumn, Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('CUSTOMER')
export class Customer extends BaseEntity {
  @OneToOne(() => User, (user: User) => user.userId)
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 42 })
  customerId: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
