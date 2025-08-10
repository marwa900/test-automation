/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,

} from '@nestjs/common';

import { TodosService } from './todos.service';
import type { Todo } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body('text') text: string): Todo {
    return this.todosService.create(text);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('text') text: string): Todo {
    return this.todosService.update(+id, text);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    this.todosService.delete(+id);
    return { success: true };
  }
}
