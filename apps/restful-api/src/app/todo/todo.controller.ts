import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodoEntity } from '@share/common/entity';
import { TodoAlreadyExistException } from '@share/server/exception';
import { TodoService } from '@share/server/service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodoForm } from './todo.form';

@Controller('/todo')
@UseGuards(JwtAuthGuard)
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'API to get all todos.' })
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'API to get one todo.' })
  getTodo(@Param('id') id: number) {
    return this.todoService.getTodo(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'API to register one todo.' })
  @ApiBody({ type: TodoEntity, description: 'todo entity body' })
  async registerTodo(@Body() todoForm: TodoForm) {
    const { title, deadline } = todoForm;
    const isExist = await this.todoService.isExist({ title });
    if (isExist === true) {
      throw new TodoAlreadyExistException({
        message: `title=[${title}] is already registerd.`,
      });
    }
    return this.todoService.addTodo(title, deadline);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'API to update one todo.' })
  @ApiBody({ type: TodoEntity, description: 'todo entity body' })
  async editTodo(@Param('id') id: number, @Body() todoForm: TodoForm) {
    const { title, deadline } = todoForm;
    const isExist = await this.todoService.isExist({ id, title });
    if (isExist === true) {
      throw new TodoAlreadyExistException({
        message: `title=[${title}] is already registerd.`,
      });
    }
    return this.todoService.editTodo(id, title, deadline);
  }

  @Patch('/:id/toggle-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'API to toggle todo status.' })
  async toggleTodoStatus(@Param('id') id: number) {
    return this.todoService.toggleTodoStatus(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'API to delete one todo.' })
  async deleteTodo(@Param('id') id: number) {
    this.todoService.deleteTodo(id);
  }
}
