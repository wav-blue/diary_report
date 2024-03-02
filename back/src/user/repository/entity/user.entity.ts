import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('USER')
export class User extends BaseEntity {
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
