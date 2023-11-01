import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotAddLeaseholderComponent } from './garden-plot-add-leaseholder.component';

describe('GardenPlotAddLeaseholderComponent', () => {
  let component: GardenPlotAddLeaseholderComponent;
  let fixture: ComponentFixture<GardenPlotAddLeaseholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotAddLeaseholderComponent]
    });
    fixture = TestBed.createComponent(GardenPlotAddLeaseholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
