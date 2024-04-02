import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('TITLE')
export class Title extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleId: number;

  @Column({ type: 'integer' })
  titleType: number;

  @Column({ type: 'integer', default: 0 })
  titlePrice: number;

  @Column({ type: 'varchar', length: 50 })
  titleName: string;

  @Column({ type: 'varchar', length: 200 })
  titleDescription: string;

  @CreateDateColumn({ type: 'smalldatetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'smalldatetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'smalldatetime', nullable: true })
  deletedAt: Date;
}
