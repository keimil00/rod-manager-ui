import { TestBed } from '@angular/core/testing';

import { TopAppBarService } from './top-app-bar.service';

describe('TopAppBarService', () => {
  let service: TopAppBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopAppBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
