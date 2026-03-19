import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Swagger Setup ---
  const config = new DocumentBuilder()
    .setTitle('Task & Project Management API')
    .setDescription('API для управления задачами и проектами')
    .setVersion('1.0')
    .addBearerAuth() // JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
