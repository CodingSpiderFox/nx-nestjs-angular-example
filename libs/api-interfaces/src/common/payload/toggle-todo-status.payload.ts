import { TodoEntity } from '@share/common/entity';

export type ToggleTodoStatusPayload = Pick<TodoEntity, 'id'>;
