import { TestBed } from '@angular/core/testing';

import { BackendGardenService } from './backend-garden.service';

describe('BackendGardenService', () => {
  let service: BackendGardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendGardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
