import { TestBed } from '@angular/core/testing';

import { ListOfUsersService } from './list-of-users.service';

describe('ListOfUsersService', () => {
  let service: ListOfUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
