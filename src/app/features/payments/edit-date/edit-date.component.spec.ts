import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDateComponent } from './edit-date.component';

describe('EditDateComponent', () => {
  let component: EditDateComponent;
  let fixture: ComponentFixture<EditDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDateComponent]
    });
    fixture = TestBed.createComponent(EditDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
