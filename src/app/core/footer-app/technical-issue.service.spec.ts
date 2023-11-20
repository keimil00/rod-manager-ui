import { TestBed } from '@angular/core/testing';

import { TechnicalIssueService } from './technical-issue.service';

describe('TechnicalIssueService', () => {
  let service: TechnicalIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
