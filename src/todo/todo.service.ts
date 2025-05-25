import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

// DTOの型定義（Data Transfer Object）
export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

@Injectable()
export class TodoService {
  // PrismaServiceを依存注入
  constructor(private prisma: PrismaService) {}

  // 全てのTodoを取得
  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc', // 新しい順で取得
      },
    });
  }

  // IDでTodoを取得
  async findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  // 新しいTodoを作成
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
      },
    });
  }

  // Todoを更新
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  // Todoを削除
  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
