import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('TITLE_ITEM')
export class TitleItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleItemId: number;

  titleId: number;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @CreateDateColumn({ type: 'smalldatetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'smalldatetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'smalldatetime', nullable: true })
  deletedAt: Date;
}
