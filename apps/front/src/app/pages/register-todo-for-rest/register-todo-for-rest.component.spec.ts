import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTodoForRestComponent } from './register-todo-for-rest.component';

describe('RegisterTodoForRestComponent', () => {
  let component: RegisterTodoForRestComponent;
  let fixture: ComponentFixture<RegisterTodoForRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTodoForRestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTodoForRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
