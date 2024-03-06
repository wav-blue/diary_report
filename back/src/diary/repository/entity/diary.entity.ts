import { User } from 'src/user/repository/entity/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('DIARY')
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  diaryId: number;

  @ManyToOne(() => User, (user: User) => user.userId)
  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'integer' })
  satisfy: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
