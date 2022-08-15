import { PartialType } from '@nestjs/mapped-types';
import { CreatePreset } from './create.preset.dto';

export class UpdatePresetDto extends PartialType(CreatePreset) {}
