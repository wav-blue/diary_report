import {
  BaseEntity,
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('CUSTOMER')
export class Customer extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 42 })
  customerKey: string;

  @CreateDateColumn({ type: 'smalldatetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'smalldatetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'smalldatetime', nullable: true })
  deletedAt: Date;
}
