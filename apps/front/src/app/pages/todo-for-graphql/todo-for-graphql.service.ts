import { Injectable } from '@angular/core';
import { Todo, TodoInput } from '@share/common/graphql-schema';
import {
  DeleteTodoPayload,
  EditTodoPayload,
  FetchTodoPayload,
  RegisterTodoPayload,
  ToggleTodoStatusPayload,
} from '@share/common/payload';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-boost';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoForGraphqlService {
  constructor(private readonly apollo: Apollo) {}

  getTodo(fetchTodoPayload: FetchTodoPayload): Observable<Todo> {
    const query = gql`
      query($id: Int!) {
        fetchTodo(id: $id) {
          id
          title
          complete
          deadline
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo
      .query({
        query: query,
        variables: {
          id: fetchTodoPayload.id,
        },
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ fetchTodo: Todo }>) =>
            result.data.fetchTodo
        )
      );
  }

  getTodos(): Observable<Todo[]> {
    const query = gql`
      {
        fetchTodos {
          id
          title
          complete
          deadline
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo
      .query({
        query: query,
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ fetchTodos: Todo[] }>) =>
            result.data.fetchTodos
        )
      );
  }

  registerTodo(registerTodoPayload: RegisterTodoPayload): Observable<Todo> {
    const mutation = gql`
      mutation($todoInput: TodoInput!) {
        registerTodo(todoInput: $todoInput) {
          id
          title
          complete
          deadline
          createdAt
          updatedAt
        }
      }
    `;
    const todoInput: TodoInput = {
      title: registerTodoPayload.title,
      deadline: registerTodoPayload.deadline,
    };

    return this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          todoInput,
        },
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ registerTodo: Todo }>) =>
            result.data.registerTodo
        )
      );
  }

  editTodo(editTodoPayload: EditTodoPayload): Observable<Todo> {
    const mutation = gql`
      mutation($id: Int!, $todoInput: TodoInput!) {
        editTodo(id: $id, todoInput: $todoInput) {
          id
          title
          complete
          deadline
          createdAt
          updatedAt
        }
      }
    `;
    const todoInput: TodoInput = {
      title: editTodoPayload.title,
      deadline: editTodoPayload.deadline,
    };

    return this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          id: editTodoPayload.id,
          todoInput,
        },
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ editTodo: Todo }>) =>
            result.data.editTodo
        )
      );
  }

  deleteTodo(deleteTodoPayload: DeleteTodoPayload): Observable<Todo> {
    const mutation = gql`
      mutation($id: Int!) {
        removeTodo(id: $id)
      }
    `;

    return this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          id: deleteTodoPayload.id,
        },
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ deleteTodo: Todo }>) =>
            result.data.deleteTodo
        )
      );
  }

  toggleTodoStatus(
    toggleTodoStatusPayload: ToggleTodoStatusPayload
  ): Observable<Todo> {
    const mutation = gql`
      mutation($id: Int!) {
        toggleTodoStatus(id: $id) {
          id
          title
          complete
          deadline
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          id: toggleTodoStatusPayload.id,
        },
      })
      .pipe(
        map(
          (result: ApolloQueryResult<{ toggleTodoStatus: Todo }>) =>
            result.data.toggleTodoStatus
        )
      );
  }
}
