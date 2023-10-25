import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenInfoComponent } from './garden-info.component';

describe('GardenInfoComponent', () => {
  let component: GardenInfoComponent;
  let fixture: ComponentFixture<GardenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenInfoComponent]
    });
    fixture = TestBed.createComponent(GardenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
