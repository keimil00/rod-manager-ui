import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDescriptionDialogComponent } from './edit-description-dialog.component';

describe('EditDescriptionDialogComponent', () => {
  let component: EditDescriptionDialogComponent;
  let fixture: ComponentFixture<EditDescriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDescriptionDialogComponent]
    });
    fixture = TestBed.createComponent(EditDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
