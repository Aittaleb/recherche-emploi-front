import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MatchingService } from './matching.service';

describe('MatchingService', () => {
  let service: MatchingService;
  let httpTesting: HttpTestingController;

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 1, name: 'Test User' })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceMock },
      ],
    });
    service = TestBed.inject(MatchingService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it("getMatchingInformation doit appeler l'API avec les bons parametres", () => {
    const profilId = 1;
    const offreId = 'offre123';
    const mockResponse = { score: 85, details: 'Matching details' };

    service.getMatchingInformation(profilId, offreId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTesting.expectOne(`/api/profil/${profilId}/offre/${offreId}/matching`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('doit construire l URL meme avec un identifiant offre vide', () => {
    service.getMatchingInformation(12, '').subscribe();

    const req = httpTesting.expectOne('/api/profil/12/offre//matching');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('doit propager les erreurs HTTP', () => {
    let errorStatus = 0;

    service.getMatchingInformation(1, 'offre123').subscribe({
      next: () => {
        throw new Error('Le flux ne doit pas reussir.');
      },
      error: (error) => {
        errorStatus = error.status;
      },
    });

    const req = httpTesting.expectOne('/api/profil/1/offre/offre123/matching');
    req.flush('Erreur', { status: 404, statusText: 'Not Found' });

    expect(errorStatus).toBe(404);
  });
});
