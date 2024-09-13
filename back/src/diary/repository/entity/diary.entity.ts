import { TimeBaseEntity } from 'common/entity/timeBase.entity';
import { DiaryStatus } from 'src/diary/enum/diaryStatus.enum';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('DIARY')
export class Diary extends TimeBaseEntity {
  @PrimaryGeneratedColumn('increment')
  diaryId: number;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'integer' })
  satisfy: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'smallint', nullable: false })
  status: number = DiaryStatus.LOADING;
}
