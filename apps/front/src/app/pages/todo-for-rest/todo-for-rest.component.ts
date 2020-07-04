import { Component, OnInit } from '@angular/core';
import { TodoEntity } from '@share/common/entity';
import { Observable } from 'rxjs';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { TodoFacade } from '../../store/todo-for-rest/facade';

@Component({
  selector: 'todo-for-rest-page',
  templateUrl: './todo-for-rest.component.html',
  styleUrls: ['./todo-for-rest.component.scss'],
})
export class TodoForRestComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'deadline',
    'complete',
    'actions',
  ];
  todoEntities$: Observable<TodoEntity[]> = this.todoFacade.selectTodos();

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly todoFacade: TodoFacade
  ) {
    this.pageFacade.changePage(PageEnum.TODO_LIST_FOR_RESTFUL_API);
  }

  ngOnInit(): void {
    this.todoFacade.fetchTodos();
  }

  handleToggleStatus(id: number) {
    this.todoFacade.toggleTodoStatus({ id });
  }

  handleDeleteTodo(id: number) {
    this.todoFacade.deleteTodo({ id });
  }
}
