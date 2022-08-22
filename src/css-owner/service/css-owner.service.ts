import {
  BadGatewayException,
  BadRequestException,
  Body,
  Header,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { Repository } from 'typeorm';
import { AgentPreset } from '../entity/agentClass.entity';
import { agentOrganize } from '../entity/profile.entity';
import { CreateOrganizeDto } from '../input/create.organize.dto';
import { CreatePreset } from '../input/create.preset.dto';
import { UpdatePresetDto } from '../input/update.preset.dto';

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
  async setOrganizeByDomain(
    input: CreateOrganizeDto,
    type,
  ): Promise<agentOrganize> {
    if (type.toLowerCase() === `agent`) {
      console.log(new URL(input.domain));
      const exitingOrganize = await this.organize_repo.findOne({
        where: [
          { domain: new URL(input.domain).host },
          { company: input.company },
        ],
      });
      if (exitingOrganize)
        throw new BadRequestException(['domain or company is already taken']);
      let result = await this.organize_repo.save({
        ...input,
      });
      return result;
    } else if (type.toLowerCase() === `rico`) {
      return;
    } else {
      throw new BadGatewayException(['Type not declear!!']);
    }
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
    } else if (type.toLowerCase() === 'rico') {
    } else {
      throw new NotFoundException(['result is not found']);
    }
  }

  private async getIdbyOrigins(headers) {
    console.log(headers.origin, 'headerweb');
    const uuid = await this.organize_repo.findOne({
      where: [
        {
          domain: headers.origin,
        },
      ],
    });
    if (!uuid) throw new NotFoundException(['Profile is not find!!!']);
    return uuid;
  }

  public async getOnePresetbyId(type: string, headers: string) {
    const profile = await this.getIdbyOrigins(headers);
    const result = await this.getPresetByOrganize(type, profile.id).getOne();
    if (!profile || !result) {
      throw new NotFoundException(['Profile is not find!!!']);
    } else {
      return {
        presetId: result.id,
        web_id: result.web_id,
        ...result.detail,
      };
    }
  }

  public async updatePrestById(
    type: string,
    id: string,
    presetId: string,
    detail: UpdatePresetDto,
  ): Promise<AgentPreset> {
    if (type.toLowerCase() === `agent`) {
      const agentPreset = await this.agentpreset_repo
        .createQueryBuilder('t')
        .where('t.web_id = :web_id', { web_id: id })
        .andWhere('t.id = :id', { id: presetId })
        .orderBy('t.created_at', 'ASC')
        .getOne();
      if (!agentPreset) {
        // return agentPreset;
        throw new NotFoundException(['preset not find!!!']);
      } else {
        let result = await this.agentpreset_repo.save({
          ...agentPreset,
          detail: detail,
        });
        return {
          ...result.detail,
          presetId: result.id,
          web_id: result.web_id,
        };
      }
    }
    return;
  }
}
