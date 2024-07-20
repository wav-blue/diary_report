import { User } from 'src/user/repository/entity/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Title } from './title.entity';
import { TimeBaseEntity } from 'common/entity/timeBase.entity';

@Entity('TITLE_ITEM')
export class TitleItem extends TimeBaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleItemId: number;

  @ManyToOne(() => Title, (title: Title) => title.titleId)
  @JoinColumn({ name: 'title_id' })
  titleId: number;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'varchar', length: 42 })
  userId: string;
}
