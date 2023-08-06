import { NestFactory } from '@nestjs/core';
import { AppModule } from './Core/App';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

import { ValidationExceptionFilter } from './Exceptions/ValidationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('WhereToSeat API Documentation')
    .setDescription('WhereToSeat API Documentation')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3050);
}

bootstrap();
