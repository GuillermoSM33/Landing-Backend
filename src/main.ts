import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://thinkguille.space',
    'http://161.35.56.53:3000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Accept, Authorization',
});


  // Middleware para servir archivos estáticos del frontend
  // app.use(express.static(join(__dirname, '..', 'public')));

  // app.use((req, res, next) => {
  //   res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  // });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
