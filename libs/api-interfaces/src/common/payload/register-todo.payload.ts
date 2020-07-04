import { TodoEntity } from '@share/common/entity';

export type RegisterTodoPayload = Pick<TodoEntity, 'title' | 'deadline'>;
