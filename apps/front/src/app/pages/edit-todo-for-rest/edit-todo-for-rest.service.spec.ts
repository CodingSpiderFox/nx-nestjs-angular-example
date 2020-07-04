import { TestBed } from '@angular/core/testing';

import { EditTodoForRestService } from './edit-todo-for-rest.service';

describe('EditTodoForRestService', () => {
  let service: EditTodoForRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTodoForRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
