import { Global, Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';
import { PrismaMysqlService } from './prisma-mysql.service';

@Global()
@Module({
  controllers: [PrismaController],
  providers: [PrismaMysqlService],
  exports: [PrismaMysqlService],
})
export class PrismaModule {}
