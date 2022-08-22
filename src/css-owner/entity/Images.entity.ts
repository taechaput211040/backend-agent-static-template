import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Images {
  constructor(partial?: Partial<Images | Images[]>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  public updated_at: Date;
  @Column({ nullable: true, length: 1024 })
  @Expose()
  image: string;
  @Column({ nullable: true })
  @Expose()
  alt: string;
  @Column({ nullable: true, length: 1024 })
  @Expose()
  key: string;
  @Column({ nullable: true })
  @Expose()
  type: string;
  @CreateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Column({ nullable: true })
  @Expose()
  web_id: string;
}
