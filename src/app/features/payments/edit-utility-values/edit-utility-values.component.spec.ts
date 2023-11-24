import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUtilityValuesComponent } from './edit-utility-values.component';

describe('EditUtilityValuesComponent', () => {
  let component: EditUtilityValuesComponent;
  let fixture: ComponentFixture<EditUtilityValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUtilityValuesComponent]
    });
    fixture = TestBed.createComponent(EditUtilityValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
