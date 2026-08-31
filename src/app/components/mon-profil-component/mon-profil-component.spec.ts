import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MonProfilComponent } from './mon-profil-component';
import { UserService } from '../../services/user.service';
import { ProfilService } from '../../services/profil.service';
import { CompetencesService } from '../../services/competences.service';
import { signal } from '@angular/core';

describe('MonProfilComponent', () => {
  let component: MonProfilComponent;
  let fixture: ComponentFixture<MonProfilComponent>;

  const profilMock = {
    id: 1,
    nom: 'Doe',
    prenom: 'Jane',
    email: 'jane.doe@mail.com',
    localisation: 'Paris',
    codePostal: '75001',
    anneeExperience: 4,
    competences: [{ code: 'TS', libelle: 'TypeScript' }],
  };

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 1 })),
  };

  const profilServiceMock = {
    getProfilInformation: vi.fn(() => of(profilMock)),
    modifierProfil: vi.fn((_: number, payload) => of({ ...payload, id: 1 })),
    declarerServicePret: vi.fn(),
    serviceEstPret: vi.fn(signal(true)),
    estServiceEnErreur: vi.fn(signal(false))
  };

  const competencesServiceMock = {
    getCompetences: vi.fn(() =>
      of([
        { code: 'TS', libelle: 'TypeScript' },
        { code: 'NG', libelle: 'Angular' },
      ])
    ),
  };

  const liveAnnouncerMock = {
    announce: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [MonProfilComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ProfilService, useValue: profilServiceMock },
        { provide: CompetencesService, useValue: competencesServiceMock },
        { provide: LiveAnnouncer, useValue: liveAnnouncerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit doit charger le profil et les competences', () => {
    component.ngOnInit();

    expect(profilServiceMock.getProfilInformation).toHaveBeenCalledWith(1);
    expect(competencesServiceMock.getCompetences).toHaveBeenCalled();
    expect(component.profilUtilisateur().email).toBe('jane.doe@mail.com');
    expect(component['affichagePret']()).toBe(true);
  });

  it('ouvrirModificationProfil doit initialiser le formulaire et ouvrir le sidenav', () => {
    component.profilUtilisateur.set(profilMock);

    component['ouvrirModificationProfil']();

    expect(component.sidenavOpen()).toBe(true);
    expect(component['profilForm'].value.nom).toBe('Doe');
    expect(component.competencesSelectionnees()).toEqual([{ code: 'TS', libelle: 'TypeScript' }]);
  });

  it('onSubmit ne doit pas appeler le service si formulaire invalide', () => {
    component['ouvrirModificationProfil']();
    component['profilForm'].patchValue({ email: 'invalide' });

    component['onSubmit']();

    expect(profilServiceMock.modifierProfil).not.toHaveBeenCalled();
  });

  it('onSubmit doit sauvegarder le profil et fermer le sidenav', () => {
    component.profilUtilisateur.set(profilMock);
    component['ouvrirModificationProfil']();
    component['profilForm'].setValue({
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane.doe@mail.com',
      localisation: 'Lyon',
      codePostal: '69001',
      anneeExperience: 5,
    });

    component['onSubmit']();

    expect(profilServiceMock.modifierProfil).toHaveBeenCalled();
    expect(component.profilUtilisateur().localisation).toBe('Lyon');
    expect(component.sidenavOpen()).toBe(false);
  });

  it('remove doit supprimer une competence et annoncer la suppression', () => {
    component.competencesSelectionnees.set([
      { code: 'TS', libelle: 'TypeScript' },
      { code: 'NG', libelle: 'Angular' },
    ]);

    component.remove({ code: 'TS', libelle: 'TypeScript' });

    expect(component.competencesSelectionnees()).toEqual([{ code: 'NG', libelle: 'Angular' }]);
    expect(liveAnnouncerMock.announce).toHaveBeenCalledWith('Removed TypeScript');
  });
});
