import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedVotingsComponent } from './finished-votings.component';

describe('FinishedVotingsComponent', () => {
  let component: FinishedVotingsComponent;
  let fixture: ComponentFixture<FinishedVotingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishedVotingsComponent]
    });
    fixture = TestBed.createComponent(FinishedVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
