import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalFeesComponent } from './add-additional-fees.component';

describe('AddAdditionalFeesComponent', () => {
  let component: AddAdditionalFeesComponent;
  let fixture: ComponentFixture<AddAdditionalFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdditionalFeesComponent]
    });
    fixture = TestBed.createComponent(AddAdditionalFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
