import { TestBed } from '@angular/core/testing';

import { TopBarService } from './top-bar.service';

describe('TopBarService', () => {
  let service: TopBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
