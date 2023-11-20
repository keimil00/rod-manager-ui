import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPaymentsComponent } from './individual-payments.component';

describe('IndividualPaymentsComponent', () => {
  let component: IndividualPaymentsComponent;
  let fixture: ComponentFixture<IndividualPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualPaymentsComponent]
    });
    fixture = TestBed.createComponent(IndividualPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
