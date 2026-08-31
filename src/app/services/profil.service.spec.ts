import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProfilService } from './profil.service';
import { ProfilUtilisateur } from '../models/profil.utilisateur.model';

describe('ProfilService', () => {
  let service: ProfilService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProfilService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getProfilInformation doit appeler le endpoint GET du profil', () => {
    const profilId = 12;
    const mockProfil: ProfilUtilisateur = {
      id: 12,
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane.doe@mail.com',
    };

    service.getProfilInformation(profilId).subscribe((profil) => {
      expect(profil).toEqual(mockProfil);
    });

    const req = httpTesting.expectOne(`/api/profil/${profilId}?serviceName=profil`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfil);
  });

  it('modifierProfil doit appeler le endpoint PUT avec le payload', () => {
    const profilId = 12;
    const payload: ProfilUtilisateur = {
      nom: 'Durand',
      prenom: 'Alice',
      email: 'alice.durand@mail.com',
      localisation: 'Lyon',
      codePostal: '69001',
      anneeExperience: 5,
    };

    const response: ProfilUtilisateur = {
      id: 12,
      ...payload,
    };

    service.modifierProfil(profilId, payload).subscribe((profil) => {
      expect(profil).toEqual(response);
    });

    const req = httpTesting.expectOne(`/api/profil/${profilId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(response);
  });

  it('doit propager les erreurs HTTP sur getProfilInformation', () => {
    let errorStatus = 0;

    service.getProfilInformation(99).subscribe({
      next: () => {
        throw new Error('Le flux ne doit pas reussir.');
      },
      error: (error) => {
        errorStatus = error.status;
      },
    });

    const req = httpTesting.expectOne('/api/profil/99?serviceName=profil');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(errorStatus).toBe(404);
  });
});

