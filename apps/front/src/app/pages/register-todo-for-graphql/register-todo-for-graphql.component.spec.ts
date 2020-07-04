import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTodoForGraphqlComponent } from './register-todo-for-graphql.component';

describe('RegisterTodoForGraphqlComponent', () => {
  let component: RegisterTodoForGraphqlComponent;
  let fixture: ComponentFixture<RegisterTodoForGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTodoForGraphqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTodoForGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
