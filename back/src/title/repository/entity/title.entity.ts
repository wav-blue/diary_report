import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('TITLE')
export class Title extends BaseEntity {
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

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}
