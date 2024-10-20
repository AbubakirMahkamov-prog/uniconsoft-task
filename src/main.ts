import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerAuthMiddleware } from './shared/middleware/swagger.middleware'; // Import the middleware

import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Uniconsoft task')
  .setDescription('The uniconsoft API description')
  .setVersion('1.0')
  .addTag('Api')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.use('/docs', new SwaggerAuthMiddleware().use);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
