import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { agentOrganize } from './profile.entity';

@Entity()
export class AgentPreset {
  constructor(partial?: Partial<AgentPreset | AgentPreset[]>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'json' })
  @Expose()
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

  @OneToOne(() => agentOrganize, (organize) => organize.preset)
  @JoinColumn({
    name: 'web_id',
  })
  organizer: agentOrganize;
  @Column({ nullable: false })
  @Expose()
  web_id: string;

  @Column({ nullable: true, default: 'true' })
  @Expose()
  status: boolean;
}
