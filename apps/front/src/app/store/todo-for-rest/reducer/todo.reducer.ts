import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TodoEntity } from '@share/common/entity';
import * as TodoActions from '../action';

export const adapter: EntityAdapter<TodoEntity> = createEntityAdapter<
  TodoEntity
>({
  selectId: (todoEntity: TodoEntity): number => todoEntity.id,
});

export interface TodoState extends EntityState<TodoEntity> {
  selectedTodoId: number;
}
export const todoInitialState: TodoState = adapter.getInitialState({
  selectedTodoId: null,
});

/**
 * @see https://ngrx.io/guide/entity/adapter#adapter-collection-methods
 */
export const todoForRestfulReducer = createReducer(
  todoInitialState,
  //---------------------------------------------------------
  // fetch one
  //---------------------------------------------------------
  on(
    TodoActions.fetchTodo,
    (state: Readonly<TodoState>, { fetchTodoPayload }) => {
      return { ...state, selectedTodoId: fetchTodoPayload.id, loading: true };
    }
  ),
  on(
    TodoActions.fetchTodoFulfilled,
    (state: Readonly<TodoState>, { todoEntity }) => {
      return adapter.upsertOne(todoEntity, {
        ...state,
        loading: false,
      });
    }
  ),
  on(
    TodoActions.fetchTodoRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  ),
  //---------------------------------------------------------
  // fetch many
  //---------------------------------------------------------
  on(TodoActions.fetchTodos, (state: Readonly<TodoState>) => {
    return { ...state, loading: true };
  }),
  on(
    TodoActions.fetchTodosFulfilled,
    (state: Readonly<TodoState>, { todoEntities }) => {
      return adapter.setAll(todoEntities, { ...state, loading: false });
    }
  ),
  on(
    TodoActions.fetchTodosRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  ),
  //---------------------------------------------------------
  // register
  //---------------------------------------------------------
  on(TodoActions.registerTodo, (state: Readonly<TodoState>) => {
    return { ...state, loading: true };
  }),
  on(
    TodoActions.registerTodoFulfilled,
    (state: Readonly<TodoState>, { todoEntity }) => {
      return adapter.addOne(todoEntity, { ...state, loading: false });
    }
  ),
  on(
    TodoActions.registerTodoRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  ),
  //---------------------------------------------------------
  // edit
  //---------------------------------------------------------
  on(
    TodoActions.editTodo,
    (state: Readonly<TodoState>, { editTodoPayload }) => {
      return { ...state, selectedTodoId: editTodoPayload.id, loading: true };
    }
  ),
  on(
    TodoActions.editTodoFulfilled,
    (state: Readonly<TodoState>, { todoEntity }) => {
      const { id } = todoEntity;
      return adapter.updateOne(
        { id: id, changes: todoEntity },
        { ...state, loading: false }
      );
    }
  ),
  on(
    TodoActions.editTodoRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  ),
  //---------------------------------------------------------
  // delete
  //---------------------------------------------------------
  on(
    TodoActions.deleteTodo,
    (state: Readonly<TodoState>, { deleteTodoPayload }) => {
      return { ...state, selectedTodoId: deleteTodoPayload.id, loading: true };
    }
  ),
  on(TodoActions.deleteTodoFulfilled, (state: Readonly<TodoState>, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),
  on(
    TodoActions.deleteTodoRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  ),
  //---------------------------------------------------------
  // toggle todo status
  //---------------------------------------------------------
  on(
    TodoActions.toggleTodoStatus,
    (state: Readonly<TodoState>, { toggleTodoStatusPayload }) => {
      return {
        ...state,
        selectedTodoId: toggleTodoStatusPayload.id,
        loading: true,
      };
    }
  ),
  on(
    TodoActions.toggleTodoStatusFulfilled,
    (state: Readonly<TodoState>, { todoEntity }) => {
      const { id } = todoEntity;
      return adapter.updateOne(
        {
          id,
          changes: todoEntity,
        },
        { ...state, loading: false }
      );
    }
  ),
  on(
    TodoActions.toggleTodoStatusRejected,
    (state: Readonly<TodoState>, { message, error }) => {
      return { ...state, message, error, loading: false };
    }
  )
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectTodoIds = selectIds;
export const selectTodoEntities = selectEntities;
export const selectAllTodos = selectAll;
export const selectTodoTotal = selectTotal;
