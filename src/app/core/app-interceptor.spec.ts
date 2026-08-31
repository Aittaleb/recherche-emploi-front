import { ServiceEnErreurStore } from './service-en-erreur.store';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppInterceptor } from './app-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  const serviceEnErreurStoreMock = {
    ajouterServiceEnErreur: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        {
          provide: ServiceEnErreurStore,
          useValue: serviceEnErreurStoreMock,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    vi.clearAllMocks();
  });

  it('doit laisser passer la requete sans marquer de service en erreur en cas de succes', () => {
    let responseBody: unknown;

    httpClient.get('/api/dashboard/user/1', { params: { serviceName: 'dashboard' } }).subscribe((response) => {
      responseBody = response;
    });

    const req = httpTesting.expectOne(
      (request) => request.url === '/api/dashboard/user/1' && request.params.get('serviceName') === 'dashboard',
    );
    req.flush({ ok: true });

    expect(responseBody).toEqual({ ok: true });
    expect(serviceEnErreurStoreMock.ajouterServiceEnErreur).not.toHaveBeenCalled();
  });

  it('doit ajouter le service au store et propager lerreur HTTP si serviceName est present', () => {
    let receivedError: any;

    httpClient.get('/api/offres', { params: { serviceName: 'offres' } }).subscribe({
      next: () => {
        throw new Error('Le flux ne doit pas reussir.');
      },
      error: (error) => {
        receivedError = error;
      },
    });

    const req = httpTesting.expectOne(
      (request) => request.url === '/api/offres' && request.params.get('serviceName') === 'offres',
    );
    req.flush('Erreur API', { status: 500, statusText: 'Server Error' });

    expect(serviceEnErreurStoreMock.ajouterServiceEnErreur).toHaveBeenCalledOnce();
    expect(serviceEnErreurStoreMock.ajouterServiceEnErreur).toHaveBeenCalledWith('offres');
    expect(receivedError.status).toBe(500);
  });

  it('doit propager lerreur HTTP sans ajouter de service si serviceName est absent', () => {
    let receivedError: any;

    httpClient.get('/api/profil/1').subscribe({
      next: () => {
        throw new Error('Le flux ne doit pas reussir.');
      },
      error: (error) => {
        receivedError = error;
      },
    });

    const req = httpTesting.expectOne((request) => request.url === '/api/profil/1');
    req.flush('Erreur API', { status: 401, statusText: 'Unauthorized' });

    expect(serviceEnErreurStoreMock.ajouterServiceEnErreur).not.toHaveBeenCalled();
    expect(receivedError.status).toBe(401);
  });
});
