import { BaseEntity, PrimaryColumn, Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('CUSTOMER')
export class Customer extends BaseEntity {
  @OneToOne(() => User, (user: User) => user.userId)
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 42 })
  customerId: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
