import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const port = serverConfig.port;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
