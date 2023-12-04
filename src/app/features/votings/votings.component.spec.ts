import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsComponent } from './votings.component';

describe('VotingsComponent', () => {
  let component: VotingsComponent;
  let fixture: ComponentFixture<VotingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotingsComponent]
    });
    fixture = TestBed.createComponent(VotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
