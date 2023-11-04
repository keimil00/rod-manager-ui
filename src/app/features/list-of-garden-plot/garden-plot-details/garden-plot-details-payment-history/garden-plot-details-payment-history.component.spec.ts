import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPlotDetailsPaymentHistoryComponent } from './garden-plot-details-payment-history.component';

describe('GardenPlotDetailsPaymentHistoryComponent', () => {
  let component: GardenPlotDetailsPaymentHistoryComponent;
  let fixture: ComponentFixture<GardenPlotDetailsPaymentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenPlotDetailsPaymentHistoryComponent]
    });
    fixture = TestBed.createComponent(GardenPlotDetailsPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
