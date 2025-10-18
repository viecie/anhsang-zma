import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { CreateZaloDto } from './dto/create-zalo.dto';
import { UpdateZaloDto } from './dto/update-zalo.dto';

console.log("Outside: ", new Date())
@Controller('zalo')
export class ZaloController {
    constructor(private readonly zaloService: ZaloService) {}
    
  @Post("send")
  sendMessage(@Req() req: any) {
    console.log("Access to server at:", new Date())
    return this.zaloService.sendMessage(req.body)
  }
}
