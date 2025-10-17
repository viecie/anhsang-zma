import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { CreateZaloDto } from './dto/create-zalo.dto';
import { UpdateZaloDto } from './dto/update-zalo.dto';

@Controller('zalo')
export class ZaloController {
  constructor(private readonly zaloService: ZaloService) {}

  @Post("send")
  sendMessage(@Body() createZaloDto: any) {
    console.log(createZaloDto)
    console.log("sucess")
    return {result: "success"}
  }

  @Get("send")
  sendMessage1(@Body() createZaloDto: any) {
    console.log(createZaloDto)
    console.log("sucess")
    return {result: "success"}
  }

  @Post()
  create(@Body() createZaloDto: CreateZaloDto) {
    return this.zaloService.create(createZaloDto);
  }

  @Get()
  findAll() {
    return this.zaloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zaloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZaloDto: UpdateZaloDto) {
    return this.zaloService.update(+id, updateZaloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zaloService.remove(+id);
  }
}
