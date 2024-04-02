import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('USERS')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  userName: string;

  @CreateDateColumn({ type: 'smalldatetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'smalldatetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'smalldatetime', nullable: true })
  deletedAt: Date;
}
