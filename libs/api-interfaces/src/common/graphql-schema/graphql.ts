
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class TodoInput {
    title: string;
    deadline: Date;
}

export abstract class IMutation {
    abstract registerTodo(todoInput: TodoInput): Todo | Promise<Todo>;

    abstract editTodo(id: number, todoInput: TodoInput): Todo | Promise<Todo>;

    abstract toggleTodoStatus(id: number): Todo | Promise<Todo>;

    abstract removeTodo(id: number): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract fetchTodo(id: number): Todo | Promise<Todo>;

    abstract fetchTodos(): Todo[] | Promise<Todo[]>;
}

export class Todo {
    id: number;
    title: string;
    complete: boolean;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class ISubscription {
    abstract todoAdded(): Todo | Promise<Todo>;
}
