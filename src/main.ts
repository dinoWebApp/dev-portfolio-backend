import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientOrigin = configService.get<string>('CLIENT_URL');
  app.enableCors({
    origin: clientOrigin,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
