import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingLeaseFeeComponent } from './editing-lease-fee.component';

describe('EditingLeaseFeeComponent', () => {
  let component: EditingLeaseFeeComponent;
  let fixture: ComponentFixture<EditingLeaseFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditingLeaseFeeComponent]
    });
    fixture = TestBed.createComponent(EditingLeaseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
