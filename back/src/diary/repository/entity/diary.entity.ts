import { TimeBaseEntity } from 'common/entity/timeBase.entity';
import { User } from 'src/user/repository/entity/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('DIARY')
export class Diary extends TimeBaseEntity {
  @PrimaryGeneratedColumn('increment')
  diaryId: number;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ type: 'integer' })
  satisfy: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;
}
