import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '@share/common/graphql-schema';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { TodoFacade } from '../../store/todo-for-graphql/facade';

@Component({
  selector: 'edit-todo-for-graphql',
  templateUrl: './edit-todo-for-graphql.component.html',
  styleUrls: ['./edit-todo-for-graphql.component.scss'],
})
export class EditTodoForGraphqlComponent implements OnInit {
  todoForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    deadline: [
      '',
      [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')],
    ],
  });
  id: number;

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly todoFacade: TodoFacade,
    private readonly router: Router
  ) {
    this.pageFacade.changePage(PageEnum.EDIT_TODO_FOR_GRAPHQL);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoFacade.fetchTodo({ id: this.id });
    this.todoFacade.selectTodo(this.id).subscribe((todo: Todo) => {
      if (todo) {
        this.todoForm.setValue({
          title: todo.title,
          deadline: todo.deadline,
        });
      }
    });
  }

  onSubmit(): void {
    const { title, deadline } = this.todoForm.value;
    this.todoFacade.editTodo({ id: this.id, title, deadline });
    this.router.navigateByUrl(PageEnum.TODO_LIST_FOR_GRAPHQL.getUri());
  }
}
