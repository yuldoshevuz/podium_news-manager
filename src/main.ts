import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { PORT } from './common/constants';
import { swaggerSetup } from './config/swagger-setup';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  swaggerSetup(app);

  await app.listen(PORT);
}
bootstrap();
