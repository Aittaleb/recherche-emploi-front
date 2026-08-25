import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffresComponenet } from './liste-offres-componenet';

describe('ListeOffresComponenet', () => {
  let component: ListeOffresComponenet;
  let fixture: ComponentFixture<ListeOffresComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeOffresComponenet],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeOffresComponenet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
