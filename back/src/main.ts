import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as config from 'config';
import { setupSwagger } from 'common/swagger/setupSwagger';

async function bootstrap() {
  console.log('?????????');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const serverConfig = config.get('server');
  // app.setGlobalPrefix('/api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  console.log('22222222?', serverConfig.port);
  app.use(cookieParser('other-cookie-secret!!'));
  //app.use(cookieParser("secret"));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useLogger(new MyLogger());
  setupSwagger(app);
  console.log('?????????', serverConfig.port);

  await app.listen(serverConfig.port);
}
bootstrap();
