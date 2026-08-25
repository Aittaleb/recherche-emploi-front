import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardCoeurDePageComponent } from './dash-board-coeur-de-page-component';

describe('DashBoardCoeurDePageComponent', () => {
  let component: DashBoardCoeurDePageComponent;
  let fixture: ComponentFixture<DashBoardCoeurDePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardCoeurDePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashBoardCoeurDePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
