import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotListAddGardenComponent } from './garden-plot-list-add-garden.component';

describe('GardenPlotListAddGardenComponent', () => {
  let component: GardenPlotListAddGardenComponent;
  let fixture: ComponentFixture<GardenPlotListAddGardenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotListAddGardenComponent]
    });
    fixture = TestBed.createComponent(GardenPlotListAddGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
