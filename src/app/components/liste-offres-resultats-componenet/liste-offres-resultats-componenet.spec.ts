import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ListeOffresResultatsComponenet } from './liste-offres-resultats-componenet';
import { OffresService } from '../../services/offres.service';
import { UserService } from '../../services/user.service';
import { MatchingService } from '../../services/matching.service';
import { ToasterService } from '../../services/toaster.service';

describe('ListeOffresResultatsComponenet', () => {
  let component: ListeOffresResultatsComponenet;
  let fixture: ComponentFixture<ListeOffresResultatsComponenet>;
  let queryParams$: BehaviorSubject<Record<string, string>>;

  const offre = {
    id: 1,
    identifiantFt: 'FT-1',
    intituleOffre: 'Developpeur Angular',
    lieuTravail: 'Paris',
    salaire: null,
  };

  const details = {
    ...offre,
    description: 'Description',
  };

  const offresServiceMock = {
    search: vi.fn(() => of([offre])),
    searchDetails: vi.fn(() => of(details)),
    sauvegarderOffre: vi.fn(() => of({})),
  };

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 42 })),
  };

  const matchingServiceMock = {
    getMatchingInformation: vi.fn(() => of({ score: 80 })),
  };

  const dialogMock = {
    open: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  const toasterServiceMock = {
    showToast: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    queryParams$ = new BehaviorSubject<Record<string, string>>({ query: 'angular' });

    await TestBed.configureTestingModule({
      imports: [ListeOffresResultatsComponenet],
      providers: [
        { provide: OffresService, useValue: offresServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MatchingService, useValue: matchingServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock },
        { provide: ToasterService, useValue: toasterServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParams$.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeOffresResultatsComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit doit charger les offres depuis query params', () => {
    expect(offresServiceMock.search).toHaveBeenCalledWith('angular');
    expect(component.offres()).toEqual([offre]);
    expect(component.affichagePret()).toBe(true);
  });

  it('voirDetails doit ouvrir le panneau avec les details', () => {
    component.voirDetails(offre);

    expect(offresServiceMock.searchDetails).toHaveBeenCalledWith('FT-1');
    expect(component.offreDetails()).toEqual(details);
    expect(component.sidenavOpen()).toBe(true);
  });

  it('ajouterDansFavories doit sauvegarder et naviguer vers mes offres', () => {
    component['ajouterDansFavories'](details);

    expect(offresServiceMock.sauvegarderOffre).toHaveBeenCalledWith('FT-1', 42);
    expect(toasterServiceMock.showToast).toHaveBeenCalledWith('Offre ajoutée aux favoris avec succès !',);
    expect(component.sidenavOpen()).toBe(false);
  });

  it('genererRapportCorrespondance ne doit rien faire si user non connecte', () => {
    userServiceMock.currentUser.mockReturnValueOnce({} as any);

    component['genererRapportCorrespondance'](details);

    expect(matchingServiceMock.getMatchingInformation).not.toHaveBeenCalled();
    expect(dialogMock.open).not.toHaveBeenCalled();
  });

  it('genererRapportCorrespondance doit ouvrir la dialog avec offre et rapport', () => {
    component['genererRapportCorrespondance'](details);

    expect(matchingServiceMock.getMatchingInformation).toHaveBeenCalledWith(42, 'FT-1');
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
