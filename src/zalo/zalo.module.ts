import { Module } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { ZaloController } from './zalo.controller';
import { KiotvietService } from 'src/kiotviet/kiotviet.service';

@Module({
  controllers: [ZaloController],
  providers: [ZaloService, KiotvietService],
})
export class ZaloModule {}
