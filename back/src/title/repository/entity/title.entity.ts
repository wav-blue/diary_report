import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('TITLE')
export class Title extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  titleId: string;

  @Column({ type: 'varchar', length: 42 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  titleCode: string;

  @Column({ type: 'varchar', length: 50 })
  titleName: string;

  @Column({ type: 'varchar', length: 200 })
  titleDescription: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
