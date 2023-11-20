import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalIssueDialogComponent } from './technical-issue-dialog.component';

describe('TechnicalIssueDialogComponent', () => {
  let component: TechnicalIssueDialogComponent;
  let fixture: ComponentFixture<TechnicalIssueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalIssueDialogComponent]
    });
    fixture = TestBed.createComponent(TechnicalIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
