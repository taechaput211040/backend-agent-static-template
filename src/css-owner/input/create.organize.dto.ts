import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizeDto {
  @IsNotEmpty()
  @IsString()
  domain: string;
  @IsString()
  company: string;
  @IsString()
  agent: string;
}
