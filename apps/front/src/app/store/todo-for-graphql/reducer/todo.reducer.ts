import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '@share/common/graphql-schema';
import * as TodoActions from '../action';

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo): number => todo.id,
});

export interface TodoState extends EntityState<Todo> {
  selectedTodoId: number;
}
export const todoInitialState: TodoState = adapter.getInitialState({
  selectedTodoId: null,
});

/**
 * @see https://ngrx.io/guide/entity/adapter#adapter-collection-methods
 */
export const todoForGraphqlReducer = createReducer(
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
  on(TodoActions.fetchTodoFulfilled, (state: Readonly<TodoState>, { todo }) => {
    return adapter.upsertOne(todo, { ...state, loading: false });
  }),
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
    (state: Readonly<TodoState>, { todos }) => {
      return adapter.setAll(todos, { ...state, loading: false });
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
    (state: Readonly<TodoState>, { todo }) => {
      return adapter.addOne(todo, { ...state, loading: false });
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
  on(TodoActions.editTodoFulfilled, (state: Readonly<TodoState>, { todo }) => {
    const { id } = todo;
    return adapter.updateOne(
      { id: id, changes: todo },
      { ...state, loading: false }
    );
  }),
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
    (state: Readonly<TodoState>, { todo }) => {
      const { id } = todo;
      return adapter.updateOne(
        {
          id,
          changes: todo,
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
