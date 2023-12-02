import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentsComponent } from './user-payments.component';

describe('PaymentsComponent', () => {
  let component: UserPaymentsComponent;
  let fixture: ComponentFixture<UserPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentsComponent]
    });
    fixture = TestBed.createComponent(UserPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
