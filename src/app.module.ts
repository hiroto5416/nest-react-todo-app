/**
 *
 * アプリケーションのルートモジュール
 * アプリケーション全体の依存関係を管理します。
 * 各機能モジュールをインポートし、アプリケーション全体を構成します。
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

/**
 * AppModule
 *
 * アプリケーションのルートモジュール
 * 以下のコンポーネントを統合します：
 * - Controllers: リクエストのハンドリング
 * - Services: ビジネスロジックの実装
 * - Providers: 依存性の注入
 */
@Module({
  controllers: [
    AppController, // アプリケーションのルートコントローラー
    TodoController, // Todo機能のコントローラー
  ],
  providers: [
    AppService, // アプリケーションのルートサービス
    PrismaService, // データベース接続サービス
    TodoService, // Todo機能のサービス
  ],
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
