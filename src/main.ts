import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
      delete converted.__v;
    },
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, '0.0.0.0');
}
bootstrap();
