import { BadRequestException, Body, Header, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { Repository } from 'typeorm';
import { AgentPreset } from '../entity/agentClass.entity';
import { agentOrganize, ricoOrganize } from '../entity/profile.entity';
import { RicoPreset } from '../entity/ricoCss.entity';
import { CreateOrganizeDto } from '../input/create.organize.dto';
import { CreatePreset } from '../input/create.preset.dto';
import { UpdateAgentOrganize } from '../input/update.organize.dto';
import { UpdatePresetDto } from '../input/update.preset.dto';

@Injectable()
export class CssOwnerService {
  constructor(
    @InjectRepository(agentOrganize)
    private readonly organize_repo: Repository<agentOrganize>,
    @InjectRepository(AgentPreset)
    private readonly agentpreset_repo: Repository<AgentPreset>,
    @InjectRepository(ricoOrganize)
    private readonly organizeRico_repo: Repository<ricoOrganize>,
    @InjectRepository(RicoPreset)
    private readonly ricopreset_repo: Repository<RicoPreset>,
  ) {}

  async getProfileAgentOrganize(id, type) {
    if (type.toLowerCase() === 'agent') {
      const Organize = await this.organize_repo.findOne({
        where: [{ id: id }],
      });
      return Organize;
    } else if (type.toLowerCase() === 'rico') {
      const Organize = await this.organizeRico_repo.findOne({
        where: [{ id: id }],
      });
      return Organize;
    } else {
      throw new NotFoundException(['Profile is not found!!!']);
    }
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
  async setOrganizeByDomain(input: CreateOrganizeDto, type): Promise<agentOrganize> {
    const domain = input.domain.startsWith('http') ? new URL(input.domain).host : input.domain;
    input.domain = domain;
    if (type.toLowerCase() === `agent`) {
      const exitingOrganize = await this.organize_repo.findOne({
        where: [{ domain: domain }],
      });
      if (exitingOrganize) {
        return exitingOrganize;
      }
      const result = await this.organize_repo.save({
        ...input,
      });
      return result;
    } else if (type.toLowerCase() === `rico`) {
      const exitingOrganizeRico = await this.organizeRico_repo.findOne({
        where: [{ domain: domain }],
      });
      if (exitingOrganizeRico) {
        return exitingOrganizeRico;
      }
      const result = await this.organizeRico_repo.save({
        ...input,
      });
      return result;
    } else {
      throw new BadRequestException(['Type not declear!!']);
    }
  }

  //create Preset service by web_id
  public async createPreset(type: string, uuid: string, detail: CreatePreset): Promise<AgentPreset> {
    //
    const currentOrganize = await this.getProfileAgentOrganize(uuid, type);
    if (currentOrganize) {
      if (type.toLowerCase() === `agent`) {
        const agent_preset = new AgentPreset();
        agent_preset.web_id = uuid;
        agent_preset.detail = detail;
        agent_preset.status = true;
        // return agent_preset;
        return await this.agentpreset_repo.save(agent_preset);
      } else if (type.toLowerCase() === `rico`) {
        const rico_preset = new RicoPreset();
        rico_preset.web_id = uuid;
        rico_preset.detail = detail;
        rico_preset.status = true;
        return await this.ricopreset_repo.save(rico_preset);
      }
    }
    throw new BadRequestException(['Update Failed!!']);
  }

  private getPresetByOrganize(type, uuid) {
    if (type.toLowerCase() === 'agent') {
      return this.agentpreset_repo.createQueryBuilder('t').where('t.web_id = :web_id', { web_id: uuid }).orderBy('t.created_at', 'ASC');
    } else if (type.toLowerCase() === 'rico') {
      return this.ricopreset_repo.createQueryBuilder('t').where('t.web_id = :web_id', { web_id: uuid }).orderBy('t.created_at', 'ASC');
    } else {
      throw new NotFoundException(['result is not found']);
    }
  }

  public async getIdbyOrigins(headers, type) {
    const domain = new URL(headers.origin).host;
    let profile = undefined;
    if (type.toLowerCase() === `agent`) {
      profile = await this.organize_repo.findOne({
        where: [
          {
            domain: domain,
          },
        ],
      });
    } else if (type.toLowerCase() === `rico`) {
      profile = await this.organizeRico_repo.findOne({
        where: [
          {
            domain: domain,
          },
        ],
      });
    } else {
      throw new NotFoundException(['Type is not find!!!']);
    }

    if (!profile) throw new NotFoundException(['Profile is not find!!!']);
    return profile;
  }
  public async getProfilebyID(id, type) {
    let profile = undefined;
    if (type.toLowerCase() === `agent`) {
      profile = await this.organize_repo.findOne({
        where: [
          {
            id: id,
          },
        ],
      });
    } else if (type.toLowerCase() === `rico`) {
      profile = await this.organizeRico_repo.findOne({
        where: [
          {
            id: id,
          },
        ],
      });
    } else {
      throw new NotFoundException(['Type is not find!!!']);
    }

    if (!profile) throw new NotFoundException(['Profile is not find!!!']);
    return profile;
  }

  public async getOnePresetbyId(type: string, headers: string) {
    const profile = await this.getIdbyOrigins(headers, type);
    const result = await this.getPresetByOrganize(type, profile.id).getOne();
    console.log('profile', profile.id);
    if (!profile || !result) {
      throw new NotFoundException(['Profile is not find!!!']);
    } else {
      return {
        logo: profile.logo,
        presetId: result.id,
        web_id: result.web_id,
        ...result.detail,
      };
    }
  }

  public async updatePrestById(type: string, id: string, presetId: string, detail: UpdatePresetDto): Promise<AgentPreset> {
    const profile = await this.getProfilebyID(id, type);
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
        const result = await this.agentpreset_repo.save({
          ...agentPreset,
          detail: detail,
        });
        return {
          ...result.detail,
          presetId: result.id,
          web_id: result.web_id,
          logo: profile.logo,
        };
      }
    } else if (type.toLowerCase() === `rico`) {
      const ricoPreset = await this.ricopreset_repo
        .createQueryBuilder('e')
        .where('e.web_id = :web_id', { web_id: id })
        .andWhere('e.id = :id', { id: presetId })
        .orderBy('e.created_at', 'ASC')
        .getOne();
      if (!ricoPreset) {
        // return agentPreset;
        throw new NotFoundException(['preset not find!!!']);
      } else {
        const result = await this.ricopreset_repo.save({
          ...ricoPreset,
          detail: detail,
        });
        return {
          ...result.detail,
          presetId: result.id,
          web_id: result.web_id,
          logo: profile.logo,
        };
      }
    } else throw new NotFoundException(['Type is Not Found!!!']);
  }

  public async updateProfile(type: string, uuid: string, input: UpdateAgentOrganize): Promise<agentOrganize> {
    if (type.toLowerCase() === `agent`) {
      const agentProfile = await this.organize_repo
        .createQueryBuilder('t')
        .where('t.id = :id', { id: uuid })
        .orderBy('t.created_at', 'ASC')
        .getOne();
      const result = await this.organize_repo.save({
        ...agentProfile,
        ...input,
      });
      return result;
    } else if (type.toLowerCase() === `rico`) {
      const Profile = await this.organizeRico_repo
        .createQueryBuilder('t')
        .where('t.id = :id', { id: uuid })
        .orderBy('t.created_at', 'ASC')
        .getOne();
      const result = await this.organizeRico_repo.save({
        ...Profile,
        ...input,
      });
      return result;
    } else {
      throw new BadRequestException(['Profile update Failed']);
    }
  }
}
