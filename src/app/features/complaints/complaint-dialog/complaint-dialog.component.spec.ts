import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintDialogComponent } from './complaint-dialog.component';

describe('ComplaintDialogComponent', () => {
  let component: ComplaintDialogComponent;
  let fixture: ComponentFixture<ComplaintDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintDialogComponent]
    });
    fixture = TestBed.createComponent(ComplaintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
