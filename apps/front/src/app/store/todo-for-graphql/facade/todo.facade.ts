import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '@share/common/graphql-schema';
import {
  DeleteTodoPayload,
  EditTodoPayload,
  FetchTodoPayload,
  RegisterTodoPayload,
  ToggleTodoStatusPayload,
} from '@share/common/payload';
import { Observable } from 'rxjs';
import * as TodoActions from '../action';
import * as TodoSelectors from '../selector';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  constructor(private readonly store: Store) {}

  //-------------------------------------------------
  // Selector
  //-------------------------------------------------
  selectTodo(id: number): Observable<Todo> {
    return this.store.select(TodoSelectors.selectCurrentTodo);
  }

  selectTodos(): Observable<Todo[]> {
    return this.store.select(TodoSelectors.selectAllTodos);
  }

  //-------------------------------------------------
  // Dispacher
  //-------------------------------------------------
  fetchTodo(fetchTodoPayload: FetchTodoPayload): void {
    this.store.dispatch(TodoActions.fetchTodo({ fetchTodoPayload }));
  }

  fetchTodos(): void {
    this.store.dispatch(TodoActions.fetchTodos());
  }

  registerTodo(registerTodoPayload: RegisterTodoPayload): void {
    this.store.dispatch(TodoActions.registerTodo({ registerTodoPayload }));
  }

  editTodo(editTodoPayload: EditTodoPayload): void {
    this.store.dispatch(TodoActions.editTodo({ editTodoPayload }));
  }

  deleteTodo(deleteTodoPayload: DeleteTodoPayload): void {
    this.store.dispatch(TodoActions.deleteTodo({ deleteTodoPayload }));
  }

  toggleTodoStatus(toggleTodoStatusPayload: ToggleTodoStatusPayload): void {
    this.store.dispatch(
      TodoActions.toggleTodoStatus({ toggleTodoStatusPayload })
    );
  }
}
