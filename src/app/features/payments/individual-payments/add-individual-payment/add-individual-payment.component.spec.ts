import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndividualPaymentComponent } from './add-individual-payment.component';

describe('AddIndividualPaymentComponent', () => {
  let component: AddIndividualPaymentComponent;
  let fixture: ComponentFixture<AddIndividualPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIndividualPaymentComponent]
    });
    fixture = TestBed.createComponent(AddIndividualPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
