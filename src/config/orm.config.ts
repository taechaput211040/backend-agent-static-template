import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AgentPreset } from 'src/css-owner/entity/agentClass.entity';
import { agentOrganize } from 'src/css-owner/entity/profile.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'cockroachdb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [agentOrganize, AgentPreset],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
      // ca: atob(process.env.CROCK_DB_CERT),
    },
  }),
);
