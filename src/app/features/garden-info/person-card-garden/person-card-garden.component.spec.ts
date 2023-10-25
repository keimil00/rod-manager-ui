import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardGardenComponent } from './person-card-garden.component';

describe('PersonCardGardenComponent', () => {
  let component: PersonCardGardenComponent;
  let fixture: ComponentFixture<PersonCardGardenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCardGardenComponent]
    });
    fixture = TestBed.createComponent(PersonCardGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
