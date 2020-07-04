import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { TodoFacade } from '../../store/todo-for-graphql/facade';

@Component({
  selector: 'register-todo-for-graphql',
  templateUrl: './register-todo-for-graphql.component.html',
  styleUrls: ['./register-todo-for-graphql.component.scss'],
})
export class RegisterTodoForGraphqlComponent implements OnInit {
  todoForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    deadline: [
      '',
      [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')],
    ],
  });
  message: string;

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly formBuilder: FormBuilder,
    private readonly todoFacade: TodoFacade,
    private readonly router: Router
  ) {
    this.pageFacade.changePage(PageEnum.REGISTER_TODO_FOR_GRAPHQL);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { title, deadline } = this.todoForm.value;
    this.todoFacade.registerTodo({ title, deadline });
    this.router.navigateByUrl(PageEnum.TODO_LIST_FOR_GRAPHQL.getUri());
  }
}
