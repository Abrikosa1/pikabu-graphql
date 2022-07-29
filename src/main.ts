import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  const port = configService.get<number>('port');
  const env = configService.get<string>('env');

  await app.listen(port || 5000, () => {
    Logger.log(`Running on port ${port}`, 'NestApplication');
    Logger.log(`Environment ${env}`, 'NestApplication');
  });
}

bootstrap();
