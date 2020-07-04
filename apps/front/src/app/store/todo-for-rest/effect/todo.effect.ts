import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoEntity } from '@share/common/entity';
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
import { TodoForRestService } from '../../../pages/todo-for-rest/todo-for-rest.service';
import { AppbarProgressbarFacade } from '../../appbar-progressbar/facade';
import * as TodoActions from '../action';

@Injectable()
export class TodoEffects {
  private readonly SNACKBAR_DURATION = 5000;

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private readonly todoForRestService: TodoForRestService,
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
        return this.todoForRestService.getTodo(fetchTodoPayload).pipe(
          map((todoEntity: TodoEntity) =>
            TodoActions.fetchTodoFulfilled({ todoEntity })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              TodoActions.fetchTodoRejected({
                message: 'Failed to fetch todo.',
                error,
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
        return this.todoForRestService.getTodos().pipe(
          map((todoEntities: TodoEntity[]) =>
            TodoActions.fetchTodosFulfilled({ todoEntities })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              TodoActions.fetchTodosRejected({
                message: 'Failed to fetch todos.',
                error,
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
        return this.todoForRestService
          .registerTodo(todoRegistrationPayload)
          .pipe(
            map((todoEntity: TodoEntity) =>
              TodoActions.registerTodoFulfilled({ todoEntity })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                TodoActions.registerTodoRejected({
                  message: 'Failed to register todo.',
                  error,
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
        return this.todoForRestService.editTodo(todoEditPayload).pipe(
          map((todoEntity: TodoEntity) =>
            TodoActions.editTodoFulfilled({ todoEntity })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              TodoActions.editTodoRejected({
                message: 'Failed to edit todo.',
                error,
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
        return this.todoForRestService.deleteTodo(deleteTodoPayload).pipe(
          map(() => TodoActions.deleteTodoFulfilled(deleteTodoPayload)),
          catchError((error: HttpErrorResponse) =>
            of(
              TodoActions.deleteTodoRejected({
                message: 'Failed to delete todo.',
                error,
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
          return this.todoForRestService
            .toggleTodoStatus(toggleTodoStatusPayload)
            .pipe(
              map((todoEntity: TodoEntity) =>
                TodoActions.toggleTodoStatusFulfilled({ todoEntity })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  TodoActions.toggleTodoStatusRejected({
                    message: 'Failed to toggle todo status.',
                    error,
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
