import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGardenPlotComponent } from './list-of-garden-plot.component';

describe('ListOfGardenPlotComponent', () => {
  let component: ListOfGardenPlotComponent;
  let fixture: ComponentFixture<ListOfGardenPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfGardenPlotComponent]
    });
    fixture = TestBed.createComponent(ListOfGardenPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
