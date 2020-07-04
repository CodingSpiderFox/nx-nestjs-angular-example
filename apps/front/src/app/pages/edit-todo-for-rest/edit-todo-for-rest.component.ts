import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoEntity } from '@share/common/entity';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { TodoFacade } from '../../store/todo-for-rest/facade';

@Component({
  selector: 'edit-todo-for-rest',
  templateUrl: './edit-todo-for-rest.component.html',
  styleUrls: ['./edit-todo-for-rest.component.scss'],
})
export class EditTodoForRestComponent implements OnInit {
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
    this.pageFacade.changePage(PageEnum.EDIT_TODO_FOR_RESTFUL_API);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoFacade.fetchTodo({ id: this.id });
    this.todoFacade.selectTodo(this.id).subscribe((todoEntity: TodoEntity) => {
      if (todoEntity) {
        this.todoForm.setValue({
          title: todoEntity.title,
          deadline: todoEntity.deadline,
        });
      }
    });
  }

  onSubmit(): void {
    const { title, deadline } = this.todoForm.value;
    this.todoFacade.editTodo({ id: this.id, title, deadline });
    this.router.navigateByUrl(PageEnum.TODO_LIST_FOR_RESTFUL_API.getUri());
  }
}
