import { Component, OnInit } from '@angular/core';
import { Todo } from '@share/common/graphql-schema';
import { Observable } from 'rxjs';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { TodoFacade } from '../../store/todo-for-graphql/facade';

@Component({
  selector: 'todo-for-graphql-pages',
  templateUrl: './todo-for-graphql.component.html',
  styleUrls: ['./todo-for-graphql.component.scss'],
})
export class TodoForGraphqlComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'deadline',
    'complete',
    'actions',
  ];
  todos$: Observable<Todo[]> = this.todoFacade.selectTodos();

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly todoFacade: TodoFacade
  ) {
    this.pageFacade.changePage(PageEnum.TODO_LIST_FOR_GRAPHQL);
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
