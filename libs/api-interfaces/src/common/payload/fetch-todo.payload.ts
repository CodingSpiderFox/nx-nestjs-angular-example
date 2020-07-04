import { TodoEntity } from '@share/common/entity';

export type FetchTodoPayload = Pick<TodoEntity, 'id'>;
