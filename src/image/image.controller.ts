import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/css-owner/service/image.service';

@Controller('/image')
export class ImageController {
  constructor(private readonly imageService: ImagesService) {}
  @Post('/file/image/:folder')
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(@Param('folder') folder: string, @UploadedFile() file: Express.Multer.File, @Body() input: any) {
    // return file
    return this.imageService.uploadFile(file, folder, input);
  }
}
