import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotInfoComponent } from './garden-plot-info.component';

describe('GardenPlotInfoComponent', () => {
  let component: GardenPlotInfoComponent;
  let fixture: ComponentFixture<GardenPlotInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotInfoComponent]
    });
    fixture = TestBed.createComponent(GardenPlotInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
