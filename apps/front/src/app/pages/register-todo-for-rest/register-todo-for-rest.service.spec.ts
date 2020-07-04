import { TestBed } from '@angular/core/testing';
import { RegisterTodoForRestService } from './register-todo-for-rest.service';

describe('RegisterTodoForRestService', () => {
  let service: RegisterTodoForRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterTodoForRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
