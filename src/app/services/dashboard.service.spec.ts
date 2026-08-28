import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import { UserService } from './user.service';
import { Dashboard } from '../models/dashboard.model';
import { API_DASHBOARD } from '../constants/api.constants';
import { User } from '../models/user.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let userService: UserService;
  let httpTesting: HttpTestingController;

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 1, name: 'Test User' })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceMock },
      ],
    });
    service = TestBed.inject(DashboardService);
    userService = TestBed.inject(UserService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });


  it('getDashboard doit appeler l\'API avec l\'ID de l\'utilisateur actuel', () => {
    const rapportMock: Dashboard = {
      competencesADevelopper: [
        {
          code: 'COMP001',
          libelle: 'Compétence 1',
        },
      ],
      matchMoyen: 75,
      nombreOffreAnalysees: 10,
      nombreOffreFavories: 3,
    };
    //vi.spyOn(userService, 'currentUser').mockReturnValue({id: 1, prenom: 'test', nom: 'test'} as User);
    service.getDashboard()?.subscribe((response => {
      expect(response).toEqual(rapportMock);
    }));
    const request = httpTesting.expectOne(`${API_DASHBOARD}/1`);
    request.flush(rapportMock);
  });

  it("getDashboard ne doit pas appeler l'API si id utilisateur null", () => {
    vi.spyOn(userService, 'currentUser').mockReturnValue({} as User);
    service.getDashboard()?.subscribe((response) => {
      expect(response).toBeNull();
    });
    httpTesting.expectNone(`${API_DASHBOARD}/1`);
  });
});
