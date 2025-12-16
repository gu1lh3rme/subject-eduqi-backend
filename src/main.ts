import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Subject EduQi API')
    .setDescription('API for managing educational subjects and subtopics')
    .setVersion('1.0')
    .addTag('subjects', 'Operations related to subjects')
    .addTag('subtopics', 'Operations related to subtopics')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 8080}`);
  console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ?? 8080}/api`);
}
void bootstrap();
