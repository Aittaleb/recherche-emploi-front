import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OffresService } from './offres.service';

describe('OffresService', () => {
  let service: OffresService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OffresService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('supprimerOffre doit lever un erreur si idTechnique ou idUtilisateur est manquant', () => {
    expect(() => service.supprimerOffre(null, 1)).toThrow('identifiant technique ou utilisateur manquant pour supprimer l\'offre');
    expect(() => service.supprimerOffre(1, undefined)).toThrow('identifiant technique ou utilisateur manquant pour supprimer l\'offre');
  });

  it('supprimerOffre doit appeler le bon endpoint si les deux paramètres sont fournis', () => {
    const idTechnique = 123;
    const idUtilisateur = 456;

    service.supprimerOffre(idTechnique, idUtilisateur).subscribe();

    const req = httpTesting.expectOne(`/api/offres/favorites/${idTechnique}/user/${idUtilisateur}`);
    req.flush({});
  });

  it('sauvegarderOffre doit appeler le bon endpoint', () => {
    const idOffre = '123';
    const idUtilisateur = 456;

    service.sauvegarderOffre(idOffre, idUtilisateur).subscribe();

    const req = httpTesting.expectOne(`/api/offres/favorites/${idOffre}/user/${idUtilisateur}`);
    req.flush({});
  });

  it('getOffresFavorites doit appeler le bon endpoint', () => {
    const idUtilisateur = 456;
    const spy = vi.spyOn(service, 'declarerServicePret');
    service.getOffresFavorites(idUtilisateur).subscribe(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    const req = httpTesting.expectOne(`/api/offres/favorites/user/${idUtilisateur}?serviceName=offres`);
    req.flush([]);
  });

  it('search doit appeler le bon endpoint avec les bons paramètres', () => {
    const query = 'test';

    service.search(query).subscribe();

    const req = httpTesting.expectOne('/api/offres?query=test&serviceName=offres');
    req.flush([]);
  });

  it('searchDetails doit appeler le bon endpoint avec les bons paramètres', () => {
    const idOffre = '123';

    service.searchDetails(idOffre).subscribe();

    const req = httpTesting.expectOne(`/api/offres/${idOffre}?serviceName=offres`);
    req.flush({});
  })


});
