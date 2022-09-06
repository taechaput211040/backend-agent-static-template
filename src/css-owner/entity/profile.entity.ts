import { Expose } from 'class-transformer';
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
  @Expose()
  id: string;

  @Column()
  @Expose()
  domain: string;

  @Column({
    default:
      'https://smart-binary.cloud/storage/testApi/logoDefult.png',
  })
  @Expose()
  logo: string;

  @Column({ nullable: true })
  @Expose()
  company: string;

  @Column({ nullable: true })
  @Expose()
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
  @Expose()
  status: boolean;

  @OneToOne(() => AgentPreset, (preset) => preset.organizer)
  preset: AgentPreset[];
}

@Entity()
export class ricoOrganize {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  domain: string;

  @Column({
    default: 'https://smart-binary.cloud/storage/testApi/logoDefult.png',
  })
  @Expose()
  logo: string;

  @Column({ nullable: false })
  @Expose()
  company: string;

  @Column({ nullable: false })
  @Expose()
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
  @Expose()
  status: boolean;

  @OneToOne(() => RicoPreset, (preset) => preset.organizer)
  preset: RicoPreset[];
}
