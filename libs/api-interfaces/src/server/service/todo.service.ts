import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '@share/common/entity';
import { Not, Repository } from 'typeorm';
import { Todo } from '../../common/graphql-schema/graphql';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  async isExist(args: { title: string; id?: number }): Promise<boolean> {
    const { title } = args;
    return (
      1 <=
      (await this.todoRepository.count({
        where: [
          args.id ? { id: Not(args.id), title: title } : { title: title },
        ],
      }))
    );
  }

  getTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async getTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: [{ id: id }],
    });
    if (!todo) {
      throw new NotFoundException(`id=[${id}] is not found.`);
    }
    return todo;
  }

  addTodo(title: string, deadline: Date): Promise<TodoEntity> {
    const todoEntity = new TodoEntity({
      title,
      deadline,
      updatedAt: new Date(),
    });
    return this.todoRepository.save(todoEntity);
  }

  async editTodo(
    id: number,
    title: string,
    deadline: Date
  ): Promise<TodoEntity> {
    const todoEntity = await this.getTodo(id);
    const updateEntity = {
      ...todoEntity,
      title,
      deadline,
      updatedAt: new Date(),
    };
    return this.todoRepository.save(updateEntity);
  }

  async toggleTodoStatus(id: number): Promise<TodoEntity> {
    const todoEntity = await this.getTodo(id);
    const updateEntity = {
      ...todoEntity,
      complete: !todoEntity.complete,
      updatedAt: new Date(),
    };
    return this.todoRepository.save(updateEntity);
  }

  async deleteTodo(id: number): Promise<TodoEntity> {
    const todoEntity = await this.getTodo(id);
    return this.todoRepository.remove(todoEntity);
  }

  async convertToGraphqlModel(todoEntity: TodoEntity): Promise<Todo> {
    const todo: Todo = { ...todoEntity };
    return todo;
  }
}
