import {
  BadGatewayException,
  BadRequestException,
  Body,
  Header,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentPreset } from '../entity/agentClass.entity';
import { agentOrganize } from '../entity/profile.entity';
import { CreateOrganizeDto } from '../input/create.organize.dto';
import { CreatePreset } from '../input/create.preset.dto';

@Injectable()
export class CssOwnerService {
  constructor(
    @InjectRepository(agentOrganize)
    private readonly organize_repo: Repository<agentOrganize>,
    @InjectRepository(AgentPreset)
    private readonly agentpreset_repo: Repository<AgentPreset>,
  ) {}

  async getProfileAgentOrganize(id) {
    const exitingOrganize = await this.organize_repo.findOne({
      where: [{ id: id }],
    });
    return exitingOrganize;
  }

  private async getDetail(Headers) {
    return Headers;
  }

  public async getfucntion(origin) {
    console.log(origin, 'origin');
    // return `getform ==> ${await this.getDetail(origin)}`;
    return origin;
  }

  // set profile origanize service
  async setOrganizeByDomain(input: CreateOrganizeDto): Promise<agentOrganize> {
    const exitingOrganize = await this.organize_repo.findOne({
      where: [{ domain: input.domain }, { company: input.company }],
    });
    if (exitingOrganize)
      throw new BadRequestException(['domain or company is already taken']);
    let result = await this.organize_repo.save({
      ...input,
    });
    return result;
  }

  //create Preset service by web_id
  public async createPreset(
    type: string,
    uuid: string,
    detail: CreatePreset,
  ): Promise<AgentPreset> {
    //
    const exitingOrganize = await this.getProfileAgentOrganize(uuid);
    if (exitingOrganize) {
      if (type.toLowerCase() === `agent`) {
        const agent_preset = new AgentPreset();
        agent_preset.web_id = uuid;
        agent_preset.detail = detail;
        agent_preset.status = true;
        // return agent_preset;
        return await this.agentpreset_repo.save(agent_preset);
      }
    }
    throw new NotFoundException(['domain is not found']);
  }

  private getPresetByOrganize(type, uuid) {
    if (type.toLowerCase() === 'agent') {
      return this.agentpreset_repo
        .createQueryBuilder('t')
        .where('t.web_id = :web_id', { web_id: uuid })
        .orderBy('t.created_at', 'ASC');
    }
  }
  public async getOnePresetbyId(type: string, uuid: string) {
    const result = await this.getPresetByOrganize(type, uuid).getOne();
    return result.detail;
  }
}
