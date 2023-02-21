import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ricoOrganize } from './profile.entity';
@Entity()
export class RicoPreset {
  constructor(partial?: Partial<RicoPreset | RicoPreset[]>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Expose()
  @Column({ type: 'json' })
  detail: any;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToOne(() => ricoOrganize, (organize) => organize.preset)
  @JoinColumn({
    name: 'web_id',
  })
  organizer: ricoOrganize;

  @Column({ nullable: false })
  @Expose()
  web_id: string;

  @Column({ nullable: true, default: 'true' })
  @Expose()
  status: boolean;
}
