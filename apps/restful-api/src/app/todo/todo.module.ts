import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '@share/common/entity';
import { TodoService } from '@share/server/service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
