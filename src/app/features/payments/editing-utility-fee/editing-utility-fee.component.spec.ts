import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingUtilityFeeComponent } from './editing-utility-fee.component';

describe('EditingUtilityFeeComponent', () => {
  let component: EditingUtilityFeeComponent;
  let fixture: ComponentFixture<EditingUtilityFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditingUtilityFeeComponent]
    });
    fixture = TestBed.createComponent(EditingUtilityFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
