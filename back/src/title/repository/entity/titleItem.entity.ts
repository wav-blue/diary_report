import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('TITLE_ITEM')
export class TitleItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleItemId: number;

  @Column({ type: 'integer' })
  titleId: string;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
