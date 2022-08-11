import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrganizeDto } from './input/create.organize.dto';
import { CreatePreset } from './input/create.preset.dto';
import { CssOwnerService } from './service/css-owner.service';

@Controller('/css')
export class CssOwnerController {
  constructor(private readonly setService: CssOwnerService) {}
  @Get()
  // @Header('origin', 'none')
  getPreset(@Headers() headers) {
    return this.setService.getfucntion(headers);
  }
  @Post('/organization')
  createOrganize(@Body() input: any) {
    return this.setService.setOrganizeByDomain(input);
  }
  @Post('/preset/:type/:uuid')
  createpreset(
    @Param('type') type: string,
    @Param('uuid') uuid: string,
    @Body() detail: CreatePreset,
  ) {
    return this.setService.createPreset(type, uuid, detail);
  }
  @Get('/preset/:type/:uuid')
  getpreset(@Param('type') type: string, @Param('uuid') uuid: string) {
    return this.setService.getOnePresetbyId(type, uuid);
  }

  @Patch()
  updatePreset() {
    return `update Preset`;
  }
}
