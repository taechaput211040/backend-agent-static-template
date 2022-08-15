import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ricoOrganize } from './profile.entity';
@Entity()
export class RicoPreset {
  constructor() {}

  @PrimaryGeneratedColumn('uuid')
  id: string;
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
  web_id: string;

  @Column({ nullable: true, default: 'true' })
  status: boolean;
}
