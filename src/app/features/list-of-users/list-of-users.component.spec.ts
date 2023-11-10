import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUsersComponent } from './list-of-users.component';

describe('ListOfUsersComponent', () => {
  let component: ListOfUsersComponent;
  let fixture: ComponentFixture<ListOfUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfUsersComponent]
    });
    fixture = TestBed.createComponent(ListOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
