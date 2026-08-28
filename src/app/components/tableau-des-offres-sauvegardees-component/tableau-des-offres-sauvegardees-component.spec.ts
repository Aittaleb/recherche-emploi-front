import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { TableauDesOffresSauvegardeesComponent } from './tableau-des-offres-sauvegardees-component';
import { OffresService } from '../../services/offres.service';
import { UserService } from '../../services/user.service';
import { MatchingService } from '../../services/matching.service';

describe('TableauDesOffresSauvegardeesComponent', () => {
  let component: TableauDesOffresSauvegardeesComponent;
  let fixture: ComponentFixture<TableauDesOffresSauvegardeesComponent>;

  const offre = {
    id: 10,
    identifiantFt: 'FT-10',
    intituleOffre: 'Dev Fullstack',
    lieuTravail: 'Lille',
    salaire: null,
  };

  const details = {
    ...offre,
    description: 'Detail',
  };

  const offresServiceMock = {
    getOffresFavorites: vi.fn(() => of([offre])),
    searchDetails: vi.fn(() => of({ ...details })),
    supprimerOffre: vi.fn(() => of({})),
  };

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 7 })),
  };

  const matchingServiceMock = {
    getMatchingInformation: vi.fn(() => of({ score: 72 })),
  };

  const dialogMock = {
    open: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TableauDesOffresSauvegardeesComponent],
      providers: [
        { provide: OffresService, useValue: offresServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MatchingService, useValue: matchingServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableauDesOffresSauvegardeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit doit charger les offres favorites', () => {
    expect(offresServiceMock.getOffresFavorites).toHaveBeenCalledWith(7);
    expect(component.offres()).toEqual([offre]);
    expect(component.affichagePret()).toBe(true);
  });

  it('doit synchroniser dataSource via effect quand offres change', () => {
    component.offres.set([offre]);
    expect(component.dataSource.data).toEqual([offre]);
  });

  it('voirDetails doit charger les details et ouvrir le sidenav', () => {
    component.voirDetails(offre);

    expect(offresServiceMock.searchDetails).toHaveBeenCalledWith('FT-10');
    expect(component.offreDetails()?.id).toBe(10);
    expect(component.sidenavOpen()).toBe(true);
  });

  it('supprimerOffreFavorite doit supprimer localement et fermer le sidenav', () => {
    component.offres.set([offre]);
    component['supprimerOffreFavorite'](details);

    expect(offresServiceMock.supprimerOffre).toHaveBeenCalledWith(10, 7);
    expect(component.offres()).toEqual([]);
    expect(component.sidenavOpen()).toBe(false);
  });

  it('genererRapportCorrespondance doit ouvrir la dialog si user connecte', () => {
    const openSpy = vi.spyOn(component['dialog'], 'open').mockReturnValue({} as any);

    component['genererRapportCorrespondance'](details);

    expect(matchingServiceMock.getMatchingInformation).toHaveBeenCalledWith(7, 'FT-10');
    expect(openSpy).toHaveBeenCalled();
  });

  it('genererRapportCorrespondance ne doit rien faire sans user id', () => {
    userServiceMock.currentUser.mockReturnValueOnce({} as any);

    component['genererRapportCorrespondance'](details);

    expect(matchingServiceMock.getMatchingInformation).not.toHaveBeenCalled();
  });
});
