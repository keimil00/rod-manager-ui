import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementDialogComponent } from './measurement-dialog.component';

describe('MeasurementDialogComponent', () => {
  let component: MeasurementDialogComponent;
  let fixture: ComponentFixture<MeasurementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementDialogComponent]
    });
    fixture = TestBed.createComponent(MeasurementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
