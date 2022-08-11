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

  @OneToOne(() => agentOrganize, (organize) => organize.preset)
  @JoinColumn({
    name: 'web_id',
  })
  organizer: agentOrganize;
  @Column({ nullable: false })
  web_id: string;

  @Column({ nullable: true, default: 'true' })
  status: boolean;
}
