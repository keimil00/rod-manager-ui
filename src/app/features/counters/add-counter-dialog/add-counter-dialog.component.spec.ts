import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounterDialogComponent } from './add-counter-dialog.component';

describe('AddCounterDialogComponent', () => {
  let component: AddCounterDialogComponent;
  let fixture: ComponentFixture<AddCounterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCounterDialogComponent]
    });
    fixture = TestBed.createComponent(AddCounterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
