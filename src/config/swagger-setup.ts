import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: NestExpressApplication): void => {
  const configuration = new DocumentBuilder()
    .setTitle('Podium News Manager')
    .setDescription('The Podium News Manager API description')
    .setContact(
      'Muhammadali',
      'http://yuldoshev.uz',
      'mukhammadaliweb@gmail.com',
    )
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'authorization')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, configuration);

  SwaggerModule.setup('api/docs', app, documentFactory);
};
