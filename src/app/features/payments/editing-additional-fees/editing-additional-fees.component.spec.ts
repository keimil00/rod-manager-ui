import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingAdditionalFeesComponent } from './editing-additional-fees.component';

describe('EditingAdditionalFeesComponent', () => {
  let component: EditingAdditionalFeesComponent;
  let fixture: ComponentFixture<EditingAdditionalFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditingAdditionalFeesComponent]
    });
    fixture = TestBed.createComponent(EditingAdditionalFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
