import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FtpModule, FtpService } from 'nestjs-ftp';
import { ImageController } from 'src/image/image.controller';
import { CssOwnerController } from './css-owner.controller';
import { AgentPreset } from './entity/agentClass.entity';
import { Images } from './entity/Images.entity';
import { agentOrganize, ricoOrganize } from './entity/profile.entity';
import { RicoPreset } from './entity/ricoCss.entity';
import { CssOwnerService } from './service/css-owner.service';
import { ImagesService } from './service/image.service';

@Module({
  controllers: [CssOwnerController, ImageController],
  providers: [CssOwnerService, ImagesService],
  imports: [
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        return {
          host: process.env.FTP_HOST,
          password: process.env.FTP_PASSWORD,
          port: 21,
          user: process.env.FTP_USER,
          secure: false,
        };
      },
      inject: [ConfigService],
    }),
    // MulterModule.register({ dest: './upload' }),
    TypeOrmModule.forFeature([
      agentOrganize,
      AgentPreset,
      RicoPreset,
      ricoOrganize,
      Images,
    ]),
  ],
})
export class CssOwnerModule {}
