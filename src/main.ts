import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Prefix .../api/endpointName.
  app.setGlobalPrefix('api');
  await app.listen(AppModule.port);
}
bootstrap();
