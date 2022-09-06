import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FtpService } from 'nestjs-ftp';
import { Repository } from 'typeorm';
import { Images } from '../entity/Images.entity';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly image_repo: Repository<Images>,
    private readonly _ftpService: FtpService,
  ) {}
  async uploadFile(file: Express.Multer.File, folderName, input) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/webp'
    ) {
      if (file.size <= 307200) {
        const stream = Readable.from(file.buffer);
        const filename = `${folderName}-${file.originalname}`;
        const fileDest = `/testApi/${filename}`;
        const ftp = await this._ftpService.upload(stream, fileDest);
        console.log(ftp)
        // await this._ftpService.delete(fileDest);
        if (ftp.code >= 400) {
          throw new BadGatewayException();
        }
        // } catch (error) {
        //     console.log(error)
        //     throw new UnauthorizedException();
        // }

        return {
          image: `https://smart-binary.cloud/storage/testApi/${filename}`,
        };
      } else {
        throw new BadRequestException(['Size of image is more than 500kb !!!']);
      }
    } else {
      throw new BadRequestException(['Type of image is Invalid !!!']);
    }
    // var fs = require('fs');
    // var buffer = fs.readFileSync(file.path);
    // return file
    // return file
    // const stream = Readable.from(file.path);
    // return stream
  }
}
