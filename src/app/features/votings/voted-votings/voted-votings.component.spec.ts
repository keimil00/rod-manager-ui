import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedVotingsComponent } from './voted-votings.component';

describe('VotedVotingsComponent', () => {
  let component: VotedVotingsComponent;
  let fixture: ComponentFixture<VotedVotingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotedVotingsComponent]
    });
    fixture = TestBed.createComponent(VotedVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
