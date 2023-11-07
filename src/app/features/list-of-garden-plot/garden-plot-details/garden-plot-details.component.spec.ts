import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotDetailsComponent } from './garden-plot-details.component';

describe('GardenPlotDetailsComponent', () => {
  let component: GardenPlotDetailsComponent;
  let fixture: ComponentFixture<GardenPlotDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotDetailsComponent]
    });
    fixture = TestBed.createComponent(GardenPlotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
