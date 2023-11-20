import { TestBed } from '@angular/core/testing';

import { GardenInfoService } from './garden-info.service';

describe('GardenInfoService', () => {
  let service: GardenInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
