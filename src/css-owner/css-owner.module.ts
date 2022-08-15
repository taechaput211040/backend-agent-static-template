import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CssOwnerController } from './css-owner.controller';
import { AgentPreset } from './entity/agentClass.entity';
import { agentOrganize, ricoOrganize } from './entity/profile.entity';
import { RicoPreset } from './entity/ricoCss.entity';
import { CssOwnerService } from './service/css-owner.service';

@Module({
  controllers: [CssOwnerController],
  providers: [CssOwnerService],
  imports: [TypeOrmModule.forFeature([agentOrganize, AgentPreset,RicoPreset,ricoOrganize])],
})
export class CssOwnerModule {}
