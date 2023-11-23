import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenOffersComponent } from './garden-offers.component';

describe('GardenOffersComponent', () => {
  let component: GardenOffersComponent;
  let fixture: ComponentFixture<GardenOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenOffersComponent]
    });
    fixture = TestBed.createComponent(GardenOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
