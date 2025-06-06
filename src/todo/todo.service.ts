/**
 * todo.service.ts
 *
 * Todo機能のサービス
 * ビジネスロジックの実装とデータベース操作を担当します。
 * Prismaを使用してデータベースとのやり取りを行います。
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

/**
 * 新規Todo作成時のデータ型
 */
export interface CreateTodoDto {
  title: string; // Todoのタイトル（必須）
  description?: string; // Todoの説明（オプション）
}

/**
 * Todo更新時のデータ型
 * 全てのフィールドがオプション（部分更新を可能にするため）
 */
export interface UpdateTodoDto {
  title?: string; // 更新するタイトル（オプション）
  description?: string; // 更新する説明（オプション）
  completed?: boolean; // 更新する完了状態（オプション）
}

/**
 * TodoService
 *
 * Todo機能のビジネスロジックを実装します。
 * 以下の操作を提供：
 * - Todoの取得（一覧、個別）
 * - Todoの作成
 * - Todoの更新
 * - Todoの削除
 */
@Injectable()
export class TodoService {
  // PrismaServiceを依存注入
  constructor(private prisma: PrismaService) {}

  /**
   * 全てのTodoを取得
   * 作成日時の降順でソート
   *
   * @returns {Promise<Todo[]>} Todoの配列
   */
  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc', // 新しい順で取得
      },
    });
  }

  /**
   * 特定のIDのTodoを取得
   *
   * @param {number} id - 取得するTodoのID
   * @returns {Promise<Todo | null>} 取得したTodo、存在しない場合はnull
   */
  async findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  /**
   * 新しいTodoを作成
   *
   * @param {CreateTodoDto} createTodoDto - 作成するTodoのデータ
   * @returns {Promise<Todo>} 作成されたTodo
   */
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
      },
    });
  }

  /**
   * Todoを更新
   *
   * @param {number} id - 更新するTodoのID
   * @param {UpdateTodoDto} updateTodoDto - 更新するデータ
   * @returns {Promise<Todo>} 更新されたTodo
   */
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  /**
   * Todoを削除
   *
   * @param {number} id - 削除するTodoのID
   * @returns {Promise<Todo>} 削除されたTodo
   */
  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
