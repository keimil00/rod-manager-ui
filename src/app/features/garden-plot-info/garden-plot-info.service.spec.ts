import { TestBed } from '@angular/core/testing';

import { GardenPlotInfoService } from './garden-plot-info.service';

describe('GardenPlotInfoService', () => {
  let service: GardenPlotInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenPlotInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
