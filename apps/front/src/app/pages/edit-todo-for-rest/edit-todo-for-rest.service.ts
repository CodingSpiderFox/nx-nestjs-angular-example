import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoEntity } from '@share/common/entity';
import { environment } from 'apps/front/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditTodoForRestService {
  constructor(private readonly http: HttpClient) {}

  getTodo(id: number): Observable<TodoEntity> {
    return this.http.get<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo/${id}`
    );
  }

  editTodo(id: number, title: string, deadline: Date): Observable<TodoEntity> {
    return this.http.put<TodoEntity>(
      `${environment.restfulApiUrl}/api/todo/${id}`,
      {
        title: title,
        deadline: deadline,
      }
    );
  }
}
