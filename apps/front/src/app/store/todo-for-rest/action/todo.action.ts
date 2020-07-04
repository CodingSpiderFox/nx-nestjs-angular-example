import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '@share/common/entity';
import {
  DeleteTodoPayload,
  EditTodoPayload,
  FetchTodoPayload,
  RegisterTodoPayload,
  ToggleTodoStatusPayload,
} from '@share/common/payload';
import { TODO_FOR_RESTFUL_FEATURE_NAME } from '../state';

//---------------------------------------------------------
// fetch one
//---------------------------------------------------------
export const fetchTodo = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodo`,
  props<{ fetchTodoPayload: FetchTodoPayload }>()
);
export const fetchTodoFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodoFulfilled`,
  props<{ todoEntity: TodoEntity }>()
);
export const fetchTodoRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodoRejected`,
  props<{ message: string; error?: Error }>()
);
//---------------------------------------------------------
// fetch many
//---------------------------------------------------------
export const fetchTodos = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodos`
);
export const fetchTodosFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodosFulfilled`,
  props<{ todoEntities: TodoEntity[] }>()
);
export const fetchTodosRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] fetchTodosRejected`,
  props<{ message: string; error?: Error }>()
);
//---------------------------------------------------------
// register
//---------------------------------------------------------
export const registerTodo = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] registerTodo`,
  props<{ registerTodoPayload: RegisterTodoPayload }>()
);
export const registerTodoFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] registerTodoFulfilled`,
  props<{ todoEntity: TodoEntity }>()
);
export const registerTodoRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] registerTodoRejected`,
  props<{ message: string; error?: Error }>()
);
//---------------------------------------------------------
// edit
//---------------------------------------------------------
export const editTodo = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] editTodo`,
  props<{ editTodoPayload: EditTodoPayload }>()
);
export const editTodoFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] editTodoFulfilled`,
  props<{ todoEntity: TodoEntity }>()
);
export const editTodoRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] editTodoRejected`,
  props<{ message: string; error?: Error }>()
);
//---------------------------------------------------------
// delete
//---------------------------------------------------------
export const deleteTodo = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] deleteTodo`,
  props<{ deleteTodoPayload: DeleteTodoPayload }>()
);
export const deleteTodoFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] deleteTodoFulfilled`,
  props<{ id: number }>()
);
export const deleteTodoRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] deleteTodoRejected`,
  props<{ message: string; error?: Error }>()
);
//---------------------------------------------------------
// toggle todo status
//---------------------------------------------------------
export const toggleTodoStatus = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] toggleTodoStatus`,
  props<{ toggleTodoStatusPayload: ToggleTodoStatusPayload }>()
);
export const toggleTodoStatusFulfilled = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] toggleTodoStatusFulfilled`,
  props<{ todoEntity: TodoEntity }>()
);
export const toggleTodoStatusRejected = createAction(
  `[${TODO_FOR_RESTFUL_FEATURE_NAME}] toggleTodoStatusRejected`,
  props<{ message: string; error?: Error }>()
);
