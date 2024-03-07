import { User } from 'src/user/repository/entity/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Title } from './title.entity';

@Entity('TITLE_ITEM')
export class TitleItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleItemId: number;

  @ManyToOne(() => Title, (title: Title) => title.titleId)
  @JoinColumn({ name: 'title_id' })
  titleId: number;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
