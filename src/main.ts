import { NestFactory } from '@nestjs/core';
import { AppModule } from './Core/App';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ValidationPipe } from '@nestjs/common';

import { ValidationExceptionFilter } from './Exceptions/ValidationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3050);
}

bootstrap();
