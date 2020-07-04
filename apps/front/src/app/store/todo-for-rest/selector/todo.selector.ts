import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoEntity } from '@share/common/entity';
import * as todoReducers from '../reducer';
import { TodoState } from '../reducer';
import { TODO_FOR_RESTFUL_FEATURE_NAME } from '../state';

const selectUserState = createFeatureSelector<TodoState>(
  TODO_FOR_RESTFUL_FEATURE_NAME
);

export const selectTodoIds = createSelector(
  selectUserState,
  todoReducers.selectTodoIds
);
export const selectTodoEntities = createSelector(
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
  (todoEntities: TodoEntity[], selectedTodoId: number) => {
    const currentEntities =
      todoEntities.filter(
        (todoEntity: TodoEntity) => todoEntity.id == selectedTodoId
      ) || [];
    if (1 <= currentEntities.length) {
      return currentEntities[0];
    }
    return null;
  }
);
