import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVotingsComponent } from './current-votings.component';

describe('CurrentVotingsComponent', () => {
  let component: CurrentVotingsComponent;
  let fixture: ComponentFixture<CurrentVotingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentVotingsComponent]
    });
    fixture = TestBed.createComponent(CurrentVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
