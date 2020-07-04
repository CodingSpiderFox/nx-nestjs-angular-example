import { Inject, ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TodoEntity } from '@share/common/entity';
import { Todo, TodoInput } from '@share/common/graphql-schema';
import { TodoService } from '@share/server/service';
import { PubSubEngine } from 'graphql-subscriptions';

const TODO_ADDED_EVENT = 'todoAdded';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) {}

  //----------------------------------------------------------------
  // Query
  //----------------------------------------------------------------
  @Query('fetchTodos')
  async fetchTodos(): Promise<Todo[]> {
    const todoEntities = await this.todoService.getTodos();
    const todos: Todo[] = [];
    todoEntities?.forEach(async (todoEntity: TodoEntity) => {
      const todo = await this.todoService.convertToGraphqlModel(todoEntity);
      todos.push(todo);
    });
    return todos;
  }

  @Query('fetchTodo')
  async fetchTodo(@Args('id', ParseIntPipe) id: number): Promise<Todo> {
    const todoEntity = await this.todoService.getTodo(id);
    return await this.todoService.convertToGraphqlModel(todoEntity);
  }

  //----------------------------------------------------------------
  // Mutation
  //----------------------------------------------------------------
  @Mutation('registerTodo')
  async registerTodo(
    @Args({ name: 'todoInput', type: () => TodoInput }) todoInput: TodoInput
  ): Promise<Todo> {
    const { title, deadline } = todoInput;
    const isExist = await this.todoService.isExist({ title });
    if (isExist === true) {
      throw new Error(`title=[${title}] is already registerd.`);
    }
    const todoEntity = await this.todoService.addTodo(title, deadline);
    const todo = await this.todoService.convertToGraphqlModel(todoEntity);

    this.pubSub.publish(TODO_ADDED_EVENT, {
      [TODO_ADDED_EVENT]: { ...todo },
    });

    return todo;
  }

  @Mutation('editTodo')
  async editTodo(
    @Args('id', ParseIntPipe) id: number,
    @Args({ name: 'todoInput', type: () => TodoInput }) todoInput: TodoInput
  ): Promise<Todo> {
    const { title, deadline } = todoInput;
    const isExist = await this.todoService.isExist({ id, title });
    if (isExist === true) {
      throw new Error(`title=[${title}] is already registerd.`);
    }
    const todoEntity = await this.todoService.editTodo(id, title, deadline);
    return await this.todoService.convertToGraphqlModel(todoEntity);
  }

  @Mutation('toggleTodoStatus')
  async toggleTodoStatus(@Args('id', ParseIntPipe) id: number): Promise<Todo> {
    const todoEntity = await this.todoService.toggleTodoStatus(id);
    return await this.todoService.convertToGraphqlModel(todoEntity);
  }

  @Mutation('removeTodo')
  async removeTodo(@Args('id', ParseIntPipe) id: number): Promise<boolean> {
    const todoEntity = await this.todoService.deleteTodo(id);
    return todoEntity !== undefined && todoEntity.id === undefined;
  }

  //----------------------------------------------------------------
  // Subscription
  //----------------------------------------------------------------
  @Subscription(TODO_ADDED_EVENT)
  async todoAdded() {
    return this.pubSub.asyncIterator<Todo>(TODO_ADDED_EVENT);
  }
}
