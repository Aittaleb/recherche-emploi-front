import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDesOffresSauvegardeesComponent } from './tableau-des-offres-sauvegardees-component';

describe('TableauDesOffresSauvegardeesComponent', () => {
  let component: TableauDesOffresSauvegardeesComponent;
  let fixture: ComponentFixture<TableauDesOffresSauvegardeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauDesOffresSauvegardeesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableauDesOffresSauvegardeesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
