import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { type } from 'os';
import { CreatePreset } from './input/create.preset.dto';
import { UpdatePresetDto } from './input/update.preset.dto';
import { CssOwnerService } from './service/css-owner.service';

@Controller('/css')
export class CssOwnerController {
  constructor(private readonly setService: CssOwnerService) {}
  @Get()
  // @Header('origin', 'none')
  getPreset(@Headers() headers) {
    return this.setService.getfucntion(headers);
  }

  //createOrganize
  @Post('/organization')
  createOrganize(@Body() input: any, @Param('type') type: any) {
    return this.setService.setOrganizeByDomain(input, type);
  }

  //create Preset
  @Post('/preset/:type/:uuid')
  createpreset(
    @Param('type') type: string,
    @Param('uuid') uuid: string,
    @Body() detail: CreatePreset,
  ) {
    return this.setService.createPreset(type, uuid, detail);
  }

  //get Preset By type
  @Get('/preset/:type')
  getpreset(@Param('type') type: string, @Headers() headers) {
    return this.setService.getOnePresetbyId(type, headers);
  }

  //update Preset
  @Patch('/preset/:type/:uuid/:presetId')
  updatePreset(
    @Param('type') type: string,
    @Param('uuid') uuid: string,
    @Param('presetId') presetId: string,
    @Body() detail: UpdatePresetDto,
  ) {
    return this.setService.updatePrestById(type, uuid, presetId, detail);
  }
}
