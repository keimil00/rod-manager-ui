import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGardeneirsComponent } from './list-of-gardeneirs.component';

describe('ListOfGardeneirsComponent', () => {
  let component: ListOfGardeneirsComponent;
  let fixture: ComponentFixture<ListOfGardeneirsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfGardeneirsComponent]
    });
    fixture = TestBed.createComponent(ListOfGardeneirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
