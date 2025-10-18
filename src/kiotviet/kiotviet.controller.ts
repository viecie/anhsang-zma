import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KiotvietService } from './kiotviet.service';
import { CreateKiotvietDto } from './dto/create-kiotviet.dto';
import { UpdateKiotvietDto } from './dto/update-kiotviet.dto';

@Controller('kiotviet')
export class KiotvietController {
  constructor(private readonly kiotvietService: KiotvietService) {}

  @Post()
  create(@Body() createKiotvietDto: CreateKiotvietDto) {
    return this.kiotvietService.create(createKiotvietDto);
  }

  @Get('invoice/code/:code')
  findOne(@Param('code') code: string) {
    return this.kiotvietService.getInvoiceDetail(code);
  }
}
