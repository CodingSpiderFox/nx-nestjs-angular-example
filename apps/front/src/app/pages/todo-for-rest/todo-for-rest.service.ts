import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoEntity } from '@share/common/entity';
import {
  DeleteTodoPayload,
  EditTodoPayload,
  FetchTodoPayload,
  RegisterTodoPayload,
  ToggleTodoStatusPayload,
} from '@share/common/payload';
import { environment } from 'apps/front/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoForRestService {
  constructor(private readonly http: HttpClient) {}

  getTodo(fetchTodoPayload: FetchTodoPayload): Observable<TodoEntity> {
    const { id } = fetchTodoPayload;
    return this.http.get<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo/${id}`
    );
  }

  getTodos(): Observable<TodoEntity[]> {
    return this.http.get<TodoEntity[]>(`${environment.restfulApiUrl}/api/todo`);
  }

  registerTodo(
    todoRegistrationPayload: RegisterTodoPayload
  ): Observable<TodoEntity> {
    return this.http.post<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo`,
      todoRegistrationPayload
    );
  }

  editTodo(todoEditPayload: EditTodoPayload): Observable<TodoEntity> {
    const { id } = todoEditPayload;
    return this.http.put<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo/${id}`,
      todoEditPayload
    );
  }

  deleteTodo(todoDeletePayload: DeleteTodoPayload): Observable<void> {
    const { id } = todoDeletePayload;
    return this.http.delete<void>(
      `${environment.restfulApiUrl}/api/todo/${id}`
    );
  }

  toggleTodoStatus(
    toggleTodoStatusPayload: ToggleTodoStatusPayload
  ): Observable<TodoEntity> {
    const { id } = toggleTodoStatusPayload;
    return this.http.patch<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo/${id}/toggle-status`,
      {}
    );
  }
}
