import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListComponent } from './folder-list.component';

describe('FolderListComponent', () => {
  let component: FolderListComponent;
  let fixture: ComponentFixture<FolderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderListComponent]
    });
    fixture = TestBed.createComponent(FolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
