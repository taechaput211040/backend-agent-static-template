import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentPreset } from './agentClass.entity';
import { RicoPreset } from './ricoCss.entity';

@Entity()
export class agentOrganize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domain: string;

  @Column({
    default:
      'https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/ffeuZ2TFVCcdP123zqF7aufImZoUhmGZaVu5zcMx.png',
  })
  logo: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  agent: string;

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

  @Column()
  status: boolean;

  @OneToOne(() => AgentPreset, (preset) => preset.organizer)
  preset: AgentPreset[];
}

@Entity()
export class ricoOrganize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domain: string;

  @Column({
    default:
      'https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/ffeuZ2TFVCcdP123zqF7aufImZoUhmGZaVu5zcMx.png',
  })
  logo: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  agent: string;

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

  @Column()
  status: boolean;

  @OneToOne(() => RicoPreset, (preset) => preset.organizer)
  preset: RicoPreset[];
}
