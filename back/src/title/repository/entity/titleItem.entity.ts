import { User } from 'src/user/repository/entity/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Title } from './title.entity';

@Entity('TITLE_ITEM')
export class TitleItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleItemId: number;

  @ManyToOne(() => Title, (title: Title) => title.userId)
  @Column({ type: 'integer' })
  titleId: string;

  @ManyToOne(() => User, (user: User) => user.userId)
  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
