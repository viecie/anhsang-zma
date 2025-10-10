import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private jwtService: JwtService
  ) {}

  @Post("token")
  createToken() {
    return this.jwtService.sign({})
  }
}
