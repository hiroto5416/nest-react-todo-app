import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS を有効化
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Reactアプリのオリジンを許可
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type', 'Authorization'], // 許可するヘッダー
    credentials: true, // クッキーなどの認証情報を含むリクエストを許可
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
