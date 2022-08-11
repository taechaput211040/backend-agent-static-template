import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { CssOwnerModule } from './css-owner/css-owner.module';
import { AgentPreset } from './css-owner/entity/agentClass.entity';
import { agentOrganize } from './css-owner/entity/profile.entity';

@Module({
  imports: [
    CssOwnerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      // กำหนดค่าdefult
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    // useFactory เหมือนเป็นการสร้าง Factory Function เพื่อให้สามารถนำค่าที่ Config ภายในฟังก์ชันไปเป็นส่วนหนึ่งของ TypeORM
    TypeOrmModule.forFeature([agentOrganize, AgentPreset]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
