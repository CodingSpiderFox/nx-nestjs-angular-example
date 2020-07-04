import { TestBed } from '@angular/core/testing';

import { RegisterTodoForGraphqlService } from './register-todo-for-graphql.service';

describe('RegisterTodoForGraphqlService', () => {
  let service: RegisterTodoForGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterTodoForGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
