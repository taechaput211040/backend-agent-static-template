import {
  BadGatewayException,
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
  async uploadFile(file: Express.Multer.File, folderName) {
    // var fs = require('fs');
    // var buffer = fs.readFileSync(file.path);
    // return file
    // return file
    // const stream = Readable.from(file.path);
    // return stream
    const stream = Readable.from(file.buffer);
    const filename = `${folderName}-${uuid()}-${file.originalname}`;
    const fileDest = `/testApi/${filename}`;
    const ftp = await this._ftpService.upload(stream, fileDest);
    if (ftp.code >= 400) {
      throw new BadGatewayException();
    }
    // } catch (error) {
    //     console.log(error)
    //     throw new UnauthorizedException();
    // }

    return {
      key: `${folderName}-${uuid()}-${file.originalname}`,
      image: `https://smart-binary.cloud/storage/testApi/${filename}`,
    };
  }
}
