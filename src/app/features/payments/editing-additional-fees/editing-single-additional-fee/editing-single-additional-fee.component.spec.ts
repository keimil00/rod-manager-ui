import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingSingleAdditionalFeeComponent } from './editing-single-additional-fee.component';

describe('EditingSingleAdditionalFeeComponent', () => {
  let component: EditingSingleAdditionalFeeComponent;
  let fixture: ComponentFixture<EditingSingleAdditionalFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditingSingleAdditionalFeeComponent]
    });
    fixture = TestBed.createComponent(EditingSingleAdditionalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
