import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoForRestComponent } from './todo-for-rest.component';

describe('TodoForRestComponent', () => {
  let component: TodoForRestComponent;
  let fixture: ComponentFixture<TodoForRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoForRestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoForRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
