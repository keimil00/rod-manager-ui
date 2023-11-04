import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotEditGardenComponent } from './garden-plot-edit-garden.component';

describe('GardenPlotEditGardenComponent', () => {
  let component: GardenPlotEditGardenComponent;
  let fixture: ComponentFixture<GardenPlotEditGardenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotEditGardenComponent]
    });
    fixture = TestBed.createComponent(GardenPlotEditGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
