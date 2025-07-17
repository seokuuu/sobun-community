import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // 글로벌 파이프 설정
  app.useGlobalPipes(new ValidationPipe());
  
  // API 프리픽스 설정
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
}
bootstrap();