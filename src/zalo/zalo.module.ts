import { Module } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { ZaloController } from './zalo.controller';

@Module({
  controllers: [ZaloController],
  providers: [ZaloService],
})
export class ZaloModule {}
