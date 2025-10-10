import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
	imports: [
		PrismaModule,
		ProductModule,
		AuthModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: "5h" },
		}),
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy],
})
export class AppModule {}
