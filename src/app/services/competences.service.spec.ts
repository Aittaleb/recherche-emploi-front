import { CompetencesService } from './competences.service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { API_COMPETENCES } from '../constants/api.constants';
import { ToasterService } from './toaster.service';

describe('CompetenceService', () => {

  let service: CompetencesService;
  let httpTesting: HttpTestingController;

  const toasterServiceMock = {
    showToast: vi.fn()
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToasterService, useValue: toasterServiceMock }
      ],
    });
    service = TestBed.inject(CompetencesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('doit recuperer les competences dans le cache si disponible', () => {
    const mockCompetences = [{ code: 'A', libelle: 'Competence A' }];
    localStorage.setItem('rome_competences_cache', JSON.stringify(mockCompetences));

    service.getCompetences().subscribe((competences) => {
      expect(competences).toEqual(mockCompetences);
    });

    httpTesting.expectNone(API_COMPETENCES);
  });

  it("doit appeler l'api ROME si cache non disponible", () => {
    const mockCompetences = [{ code: 'A', libelle: 'Competence A' }];

    service.getCompetences().subscribe((competences) => {
      expect(competences).toEqual(mockCompetences);
      expect(localStorage.getItem('rome_competences_cache')).toEqual(JSON.stringify(mockCompetences));
    });

    const request = httpTesting.expectOne(API_COMPETENCES);
    request.flush(mockCompetences);
  });

  it('doit reutiliser le cache apres le premier appel API', () => {
    const mockCompetences = [{ code: 'A', libelle: 'Competence A' }];

    service.getCompetences().subscribe();
    httpTesting.expectOne(API_COMPETENCES).flush(mockCompetences);

    service.getCompetences().subscribe((competences) => {
      expect(competences).toEqual(mockCompetences);
    });
    httpTesting.expectNone(API_COMPETENCES);
  });

  it('doit propager les erreurs HTTP si API indisponible', () => {
    let statusCode = 0;

    service.getCompetences().subscribe({
      next: () => {
        throw new Error('Le flux ne doit pas reussir.');
      },
      error: (error) => {
        statusCode = error.status;
      },
    });

    const request = httpTesting.expectOne(API_COMPETENCES);
    request.flush('Erreur API', { status: 500, statusText: 'Server Error' });

    expect(statusCode).toBe(500);
    expect(localStorage.getItem('rome_competences_cache')).toBeNull();
  });

  it('doit lever une erreur si le cache localStorage est invalide', () => {
    localStorage.setItem('rome_competences_cache', '{invalid-json');

    expect(() => service.getCompetences()).toThrow();
    expect(toasterServiceMock.showToast).toHaveBeenCalledWith(
      'Erreur lors du chargement des compétences ROME. Veuillez réessayer plus tard.',
    );
    httpTesting.expectNone(API_COMPETENCES);
  });

});
