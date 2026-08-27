import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffresResultatsComponenet } from './liste-offres-resultats-componenet';

describe('ListeOffresResultatsComponenet', () => {
  let component: ListeOffresResultatsComponenet;
  let fixture: ComponentFixture<ListeOffresResultatsComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeOffresResultatsComponenet],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeOffresResultatsComponenet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
