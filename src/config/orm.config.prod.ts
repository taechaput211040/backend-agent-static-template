import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AgentPreset } from 'src/css-owner/entity/agentClass.entity';
import { Images } from 'src/css-owner/entity/Images.entity';
import {
  agentOrganize,
  ricoOrganize,
} from 'src/css-owner/entity/profile.entity';
import { RicoPreset } from 'src/css-owner/entity/ricoCss.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [agentOrganize, AgentPreset, RicoPreset, ricoOrganize, Images],
    synchronize: false,
  }),
);
