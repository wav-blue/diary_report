import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('DIARY')
export class Diary extends BaseEntity {
  @PrimaryColumn({ type: 'integer' })
  diaryId: number;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'integer' })
  satisfy: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
