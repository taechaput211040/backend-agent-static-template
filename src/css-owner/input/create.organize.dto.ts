import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizeDto {
  @IsNotEmpty()
  @IsString()
  domain: string;
  @IsNotEmpty()
  @IsString()
  company: string;
  @IsString()
  agent: string;
}
