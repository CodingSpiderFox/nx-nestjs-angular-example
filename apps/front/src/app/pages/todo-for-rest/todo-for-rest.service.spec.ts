import { TestBed } from '@angular/core/testing';
import { TodoForRestService } from './todo-for-rest.service';

describe('TodoForRestService', () => {
  let service: TodoForRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoForRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
