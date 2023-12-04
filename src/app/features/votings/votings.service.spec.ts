import { TestBed } from '@angular/core/testing';

import { VotingsService } from './votings.service';

describe('VotingsService', () => {
  let service: VotingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
