import { TestBed } from '@angular/core/testing';
import { TodoForGraphqlService } from './todo-for-graphql.service';

describe('TodoForGraphqlService', () => {
  let service: TodoForGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoForGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
