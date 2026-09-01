import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePropositionsComponent } from './liste-propositions-component';

describe('ListePropositionsComponent', () => {
  let component: ListePropositionsComponent;
  let fixture: ComponentFixture<ListePropositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePropositionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListePropositionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
