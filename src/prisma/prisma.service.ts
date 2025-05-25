import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaServiceはNestJSのサービスとして定義されています。
 * このサービスはPrismaClientを継承し、NestJSのライフサイクルイベントを利用して
 * データベース接続を管理します。
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // NestJSアプリケーション起動時にデータベースに接続
    await this.$connect();
  }
}
