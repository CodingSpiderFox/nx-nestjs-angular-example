import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '@share/common/graphql-schema';
import * as todoReducers from '../reducer';
import { TodoState } from '../reducer';
import { TODO_FOR_GRAPHQL_FEATURE_NAME } from '../state';

const selectUserState = createFeatureSelector<TodoState>(
  TODO_FOR_GRAPHQL_FEATURE_NAME
);

export const selectTodoIds = createSelector(
  selectUserState,
  todoReducers.selectTodoIds
);
export const selectTodos = createSelector(
  selectUserState,
  todoReducers.selectTodoEntities
);
export const selectAllTodos = createSelector(
  selectUserState,
  todoReducers.selectAllTodos
);
export const selectTodoTotal = createSelector(
  selectUserState,
  todoReducers.selectTodoTotal
);
export const selectCurrentTodoId = createSelector(
  selectUserState,
  (todoState: TodoState) => todoState.selectedTodoId
);
export const selectCurrentTodo = createSelector(
  selectAllTodos,
  selectCurrentTodoId,
  (todos: Todo[], selectedTodoId: number) => {
    const currentTodos =
      todos.filter((todo: Todo) => todo.id == selectedTodoId) || [];
    if (1 <= currentTodos.length) {
      return currentTodos[0];
    }
    return null;
  }
);
