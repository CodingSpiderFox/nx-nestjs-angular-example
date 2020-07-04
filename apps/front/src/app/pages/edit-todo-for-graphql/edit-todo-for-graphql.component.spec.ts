import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoForGraphqlComponent } from './edit-todo-for-graphql.component';

describe('EditTodoForGraphqlComponent', () => {
  let component: EditTodoForGraphqlComponent;
  let fixture: ComponentFixture<EditTodoForGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoForGraphqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoForGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
