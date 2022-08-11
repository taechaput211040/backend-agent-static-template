import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePreset {
  @IsNotEmpty()
  detail: string;
  // web_id: any;
}
