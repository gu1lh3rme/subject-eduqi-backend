import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',') 
      : [
          'http://localhost:3000', // React default
          'http://localhost:3001', // Alternative React port
          'http://localhost:4200', // Angular default
          'http://localhost:5000', // Alternative port
          'http://localhost:5173', // Vite default
          'http://localhost:8000', // Alternative port
          'http://127.0.0.1:3000',
          'http://127.0.0.1:5173',
        ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Subject EduQi API')
    .setDescription('API for managing educational subjects and subtopics with authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management operations')
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
