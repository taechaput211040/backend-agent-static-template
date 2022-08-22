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
      'https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/ffeuZ2TFVCcdP123zqF7aufImZoUhmGZaVu5zcMx.png',
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
    default:
      'https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/ffeuZ2TFVCcdP123zqF7aufImZoUhmGZaVu5zcMx.png',
  })
  @Expose()
  logo: string;

 
  @Column()
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

  @OneToOne(() => RicoPreset, (preset) => preset.organizer)
  preset: RicoPreset[];
}
