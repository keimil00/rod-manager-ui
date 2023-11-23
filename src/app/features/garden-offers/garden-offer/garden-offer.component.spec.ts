import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenOfferComponent } from './garden-offer.component';

describe('GardenOfferComponent', () => {
  let component: GardenOfferComponent;
  let fixture: ComponentFixture<GardenOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenOfferComponent]
    });
    fixture = TestBed.createComponent(GardenOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
