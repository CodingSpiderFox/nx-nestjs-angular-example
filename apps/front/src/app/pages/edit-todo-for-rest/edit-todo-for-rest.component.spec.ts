import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoForRestComponent } from './edit-todo-for-rest.component';

describe('EditTodoForRestComponent', () => {
  let component: EditTodoForRestComponent;
  let fixture: ComponentFixture<EditTodoForRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoForRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoForRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
