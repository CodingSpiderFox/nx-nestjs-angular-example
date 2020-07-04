import { TodoEntity } from '@share/common/entity';

export type EditTodoPayload = Pick<TodoEntity, 'id' | 'title' | 'deadline'>;
