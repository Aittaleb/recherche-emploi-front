import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheOffre } from './recherche-offre';

describe('RechercheOffre', () => {
  let component: RechercheOffre;
  let fixture: ComponentFixture<RechercheOffre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheOffre],
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheOffre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
