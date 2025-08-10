/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

export interface Todo {
  id: number;
  text: string;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [{ id: 1, text: 'First Task' }];

  findAll(): Todo[] {
    return this.todos;
  }

  create(text: string): Todo {
    const newTodo = { id: Date.now(), text };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, text: string): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    todo.text = text;
    return todo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
