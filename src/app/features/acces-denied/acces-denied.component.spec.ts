import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDeniedComponent } from './acces-denied.component';

describe('AccesDeniedComponent', () => {
  let component: AccesDeniedComponent;
  let fixture: ComponentFixture<AccesDeniedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesDeniedComponent]
    });
    fixture = TestBed.createComponent(AccesDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
