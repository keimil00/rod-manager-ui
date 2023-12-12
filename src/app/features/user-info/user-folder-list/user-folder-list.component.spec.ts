import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFolderListComponent } from './user-folder-list.component';

describe('UserFolderListComponent', () => {
  let component: UserFolderListComponent;
  let fixture: ComponentFixture<UserFolderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFolderListComponent]
    });
    fixture = TestBed.createComponent(UserFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
