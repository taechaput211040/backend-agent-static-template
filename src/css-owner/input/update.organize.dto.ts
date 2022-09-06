import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizeDto } from './create.organize.dto';

export class UpdateAgentOrganize extends PartialType(CreateOrganizeDto) {}
