import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { type } from 'os';
import { CreatePreset } from './input/create.preset.dto';
import { UpdateAgentOrganize } from './input/update.organize.dto';
import { UpdatePresetDto } from './input/update.preset.dto';
import { CssOwnerService } from './service/css-owner.service';
import { Cache } from 'cache-manager';
import { Response } from 'express';
@Controller('/css')
export class CssOwnerController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly setService: CssOwnerService) {}
  @Get()
  // @Header('origin', 'none')
  getPreset(@Headers() headers) {
    return this.setService.getfucntion(headers);
  }

  //getProfile by type
  @Get('/profile/:type')
  getProfileByHeader(@Headers() headers, @Param('type') type: any) {
    return this.setService.getIdbyOrigins(headers, type);
  }

  @Patch('/profile/:type/:uuid')
  async updateProfileById(@Param('type') type: any, @Param('uuid') uuid: string, @Body() input: UpdateAgentOrganize) {
    const profile = await this.setService.getProfilebyID(uuid, type);
    const profileCach = 'get_data' + profile.domain;
    await this.cacheManager.del(profileCach);
    return this.setService.updateProfile(type, uuid, input);
  }

  //createOrganize
  @Post('/organization/:type')
  createOrganize(@Body() input: any, @Param('type') type: any) {
    return this.setService.setOrganizeByDomain(input, type);
  }

  //create Preset
  @Post('/preset/:type/:uuid')
  createpreset(@Param('type') type: string, @Param('uuid') uuid: string, @Body() detail: CreatePreset) {
    return this.setService.createPreset(type, uuid, detail);
  }

  //get Preset By type
  @Get('/preset/:type')
  async getpreset(@Param('type') type: string, @Headers() headers) {
    console.log('origin', headers.origin);
    const value = await this.cacheManager.get('get_data' + headers.origin);
    if (value) {
      console.log('cach', value);
      return value;
    }
    const result = await this.setService.getOnePresetbyId(type, headers);
    if (result) {
      await this.cacheManager.set('get_data' + headers.origin, result);
      console.log('nocach');
      return result;
    }
  }

  //update Preset
  @Patch('/preset/:type/:uuid/:presetId')
  async updatePreset(
    @Param('type') type: string,
    @Param('uuid') uuid: string,
    @Param('presetId') presetId: string,
    @Body() detail: UpdatePresetDto,
  ) {
    const profile = await this.setService.getProfilebyID(uuid, type);
    const profileCach = 'get_data' + profile.domain;
    await this.cacheManager.del(profileCach);
    const result = await this.setService.updatePrestById(type, uuid, presetId, detail);
    if (result) {
      await this.cacheManager.set(`${profileCach}`, result);
      return result;
    }
  }

  @Get('/reset/cache')
  async getResetCache(@Res() res: Response) {
    await this.cacheManager.reset();
    res.status(200).send('(╯°□°）╯︵ ┻━┻) ');
  }
}
