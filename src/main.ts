import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.enableCors();
	app.use(express.static("."));
	const config = new DocumentBuilder().build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);
    const PORT = process.env.PORT || 8080;
	await app.listen(PORT, () => console.log(`Go to: http://localhost:${PORT}/`));
}
bootstrap();
