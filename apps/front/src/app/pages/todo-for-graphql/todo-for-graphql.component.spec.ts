import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoForGraphqlComponent } from './todo-for-graphql.component';

describe('TodoForGraphqlComponent', () => {
  let component: TodoForGraphqlComponent;
  let fixture: ComponentFixture<TodoForGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoForGraphqlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoForGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
