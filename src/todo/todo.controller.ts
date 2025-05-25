import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService, CreateTodoDto, UpdateTodoDto } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // GET /todos - 全てのTodoを取得
  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  // GET /todos/:id - 特定のTodoを取得
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOne(id);
  }

  // POST /todos - 新しいTodoを作成
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  // PATCH /todos/:id - Todoを更新
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  // DELETE /todos/:id - Todoを削除
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }
}
