import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '@share/common/entity';
import { TodoService } from '@share/server/service';
import { PubSub } from 'graphql-subscriptions';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    TodoResolver,
    TodoService,
  ],
  exports: [TodoService],
})
export class TodoModule {}
