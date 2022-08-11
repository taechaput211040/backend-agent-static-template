import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CssOwnerController } from './css-owner.controller';
import { AgentPreset } from './entity/agentClass.entity';
import { agentOrganize } from './entity/profile.entity';
import { CssOwnerService } from './service/css-owner.service';

@Module({
  controllers: [CssOwnerController],
  providers: [CssOwnerService],
  imports: [TypeOrmModule.forFeature([agentOrganize, AgentPreset])],
})
export class CssOwnerModule {}
