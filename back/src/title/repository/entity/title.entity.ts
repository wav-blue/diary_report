import { TimeBaseEntity } from 'common/entity/timeBase.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('TITLE')
export class Title extends TimeBaseEntity {
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
}
