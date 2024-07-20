import { TimeBaseEntity } from 'common/entity/timeBase.entity';
import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('USER')
export class User extends TimeBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  userName: string;
}
