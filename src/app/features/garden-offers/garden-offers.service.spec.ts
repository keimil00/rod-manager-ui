import { TestBed } from '@angular/core/testing';

import { GardenOffersService } from './garden-offers.service';

describe('GardenOffersService', () => {
  let service: GardenOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
