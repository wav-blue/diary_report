import { TimeBaseEntity } from 'common/entity/timeBase.entity';
import { User } from 'src/user/repository/entity/user.entity';
import { PrimaryColumn, Column, Entity, OneToOne } from 'typeorm';

@Entity('CUSTOMER')
export class Customer extends TimeBaseEntity {
  @OneToOne(() => User, (user: User) => user.userId)
  @PrimaryColumn({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 42 })
  customerKey: string;
}
