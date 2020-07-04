import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Todo } from '@share/common/graphql-schema';
import {
  DeleteTodoPayload,
  EditTodoPayload,
  FetchTodoPayload,
  RegisterTodoPayload,
  ToggleTodoStatusPayload,
} from '@share/common/payload';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { SnackbarValues } from '../../../enum';
import { GraphqlErrorModel } from '../../../model';
import { TodoForGraphqlService } from '../../../pages/todo-for-graphql/todo-for-graphql.service';
import { TodoForRestService } from '../../../pages/todo-for-rest/todo-for-rest.service';
import { AppbarProgressbarFacade } from '../../appbar-progressbar/facade';
import * as TodoActions from '../action';

@Injectable()
export class TodoForGraphqlEffects {
  private readonly SNACKBAR_DURATION = 5000;

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private readonly todoForRestService: TodoForRestService,
    private readonly todoForGraphqlService: TodoForGraphqlService,
    private readonly appbarProgressbarFacade: AppbarProgressbarFacade
  ) {}

  //---------------------------------------------------------
  // fetch one
  //---------------------------------------------------------
  fetchTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTodo),
      switchMap((action: { fetchTodoPayload: FetchTodoPayload }) => {
        this.appbarProgressbarFacade.show();
        const { fetchTodoPayload } = action;
        return this.todoForGraphqlService.getTodo(fetchTodoPayload).pipe(
          map((todo: Todo) => TodoActions.fetchTodoFulfilled({ todo })),
          catchError((error: GraphqlErrorModel) =>
            of(
              TodoActions.fetchTodoRejected({
                message: error.message,
              })
            )
          )
        );
      })
    )
  );

  fetchTodoFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.fetchTodoFulfilled),
        tap(() => {
          this.appbarProgressbarFacade.hide();
        })
      ),
    { dispatch: false }
  );

  fetchTodoRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.fetchTodoRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );
  //---------------------------------------------------------
  // fetch many
  //---------------------------------------------------------
  fetchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTodos),
      switchMap(() => {
        this.appbarProgressbarFacade.show();
        return this.todoForGraphqlService.getTodos().pipe(
          map((todos: Todo[]) => TodoActions.fetchTodosFulfilled({ todos })),
          catchError((error: GraphqlErrorModel) =>
            of(
              TodoActions.fetchTodosRejected({
                message: error.message,
              })
            )
          )
        );
      })
    )
  );

  fetchTodosFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.fetchTodosFulfilled),
        tap(() => {
          this.appbarProgressbarFacade.hide();
        })
      ),
    { dispatch: false }
  );

  fetchTodosRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.fetchTodosRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );
  //---------------------------------------------------------
  // register
  //---------------------------------------------------------
  registerTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.registerTodo),
      exhaustMap((action: { registerTodoPayload: RegisterTodoPayload }) => {
        this.appbarProgressbarFacade.show();
        const { registerTodoPayload: todoRegistrationPayload } = action;
        return this.todoForGraphqlService
          .registerTodo(todoRegistrationPayload)
          .pipe(
            map((todo: Todo) => TodoActions.registerTodoFulfilled({ todo })),
            catchError((error: GraphqlErrorModel) =>
              of(
                TodoActions.registerTodoRejected({
                  message: error.message,
                })
              )
            )
          );
      })
    )
  );

  registerTodoFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.registerTodoFulfilled),
        tap(() => {
          this.handleSuccess('Todo was registered successfully.');
        })
      ),
    { dispatch: false }
  );

  registerTodoRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.registerTodoRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );
  //---------------------------------------------------------
  // edit
  //---------------------------------------------------------
  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.editTodo),
      exhaustMap((action: { editTodoPayload: EditTodoPayload }) => {
        this.appbarProgressbarFacade.show();
        const { editTodoPayload: todoEditPayload } = action;
        return this.todoForGraphqlService.editTodo(todoEditPayload).pipe(
          map((todo: Todo) => TodoActions.editTodoFulfilled({ todo: todo })),
          catchError((error: GraphqlErrorModel) =>
            of(
              TodoActions.editTodoRejected({
                message: error.message,
              })
            )
          )
        );
      })
    )
  );

  editTodoFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.editTodoFulfilled),
        tap(() => {
          this.handleSuccess('Todo was edited successfully.');
        })
      ),
    { dispatch: false }
  );

  editTodoRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.editTodoRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );
  //---------------------------------------------------------
  // delete
  //---------------------------------------------------------
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      exhaustMap((action: { deleteTodoPayload: DeleteTodoPayload }) => {
        this.appbarProgressbarFacade.show();
        const { deleteTodoPayload } = action;
        return this.todoForGraphqlService.deleteTodo(deleteTodoPayload).pipe(
          map(() => TodoActions.deleteTodoFulfilled(deleteTodoPayload)),
          catchError((error: GraphqlErrorModel) =>
            of(
              TodoActions.deleteTodoRejected({
                message: error.message,
              })
            )
          )
        );
      })
    )
  );

  deleteTodoFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTodoFulfilled),
        tap(() => {
          this.handleSuccess('Todo was deleted successfully.');
        })
      ),
    { dispatch: false }
  );

  deleteTodoRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTodoRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );
  //---------------------------------------------------------
  // toggle todo status
  //---------------------------------------------------------
  toggleTodoStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodoStatus),
      exhaustMap(
        (action: { toggleTodoStatusPayload: ToggleTodoStatusPayload }) => {
          const { toggleTodoStatusPayload } = action;
          return this.todoForGraphqlService
            .toggleTodoStatus(toggleTodoStatusPayload)
            .pipe(
              map((todo: Todo) =>
                TodoActions.toggleTodoStatusFulfilled({ todo })
              ),
              catchError((error: GraphqlErrorModel) =>
                of(
                  TodoActions.toggleTodoStatusRejected({
                    message: error.message,
                  })
                )
              )
            );
        }
      )
    )
  );

  toggleTodoStatusRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.toggleTodoStatusRejected),
        tap((action: { message: string; error?: Error }) => {
          this.handleError(action.message, action.error);
        })
      ),
    { dispatch: false }
  );

  private handleSuccess(message: string) {
    this.appbarProgressbarFacade.hide();
    this.snackBar.open(message, '', {
      panelClass: `snackbar-bg-${SnackbarValues.success}`,
      duration: this.SNACKBAR_DURATION,
    });
  }

  private handleError(message: string, error?: Error) {
    console.error(JSON.stringify(error));

    this.appbarProgressbarFacade.hide();

    if (!error) {
      this.snackBar.open(message, '', {
        panelClass: `snackbar-bg-${SnackbarValues.failure}`,
        duration: this.SNACKBAR_DURATION,
      });
      return;
    }

    if (
      error instanceof HttpErrorResponse &&
      [400, 401, 403].includes(error.status)
    ) {
      this.snackBar.open(error.error.message, '', {
        panelClass: `snackbar-bg-${SnackbarValues.warning}`,
        duration: this.SNACKBAR_DURATION,
      });
      return;
    }

    this.snackBar.open(message, '', {
      panelClass: `snackbar-bg-${SnackbarValues.failure}`,
      duration: this.SNACKBAR_DURATION,
    });
  }
}
