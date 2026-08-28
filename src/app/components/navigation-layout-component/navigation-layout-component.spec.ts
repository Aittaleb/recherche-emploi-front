import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { NavigationLayoutComponent } from './navigation-layout-component';
import { PageTitleService } from '../../services/page-title.service';
import { LoginService } from '../../services/login.service';

describe('NavigationLayoutComponent', () => {
  let component: NavigationLayoutComponent;
  let fixture: ComponentFixture<NavigationLayoutComponent>;
  let routerEvents$: Subject<unknown>;

  const pageTitleServiceMock = {
    pageTitle: vi.fn(() => 'Dashboard'),
    setPageTitle: vi.fn(),
  };

  const loginServiceMock = {
    setLogged: vi.fn(),
  };

  const routerMock = {
    url: '/app/dashboard',
    events: new Subject<unknown>(),
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    routerEvents$ = new Subject<unknown>();
    routerMock.events = routerEvents$;
    routerMock.url = '/app/dashboard';

    await TestBed.configureTestingModule({
      imports: [NavigationLayoutComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: PageTitleService, useValue: pageTitleServiceMock },
        { provide: LoginService, useValue: loginServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit mettre a jour le titre et la navigation active lors des changements de route', () => {
    routerMock.url = '/app/tableau-des-offres?query=java';
    routerEvents$.next({});

    expect(pageTitleServiceMock.setPageTitle).toHaveBeenCalledWith('Résultats de recherche');
    expect(component.menuNavigation.find((item) => item.name === 'Chercher une offre')?.current).toBe(true);
    expect(component.menuNavigation.find((item) => item.name === 'Dashboard')?.current).toBe(false);
  });

  it('doit appliquer le titre par defaut pour une route inconnue', () => {
    routerMock.url = '/route/inconnue';
    routerEvents$.next({});

    expect(pageTitleServiceMock.setPageTitle).toHaveBeenCalledWith('Job Matcher');
  });

  it('gererDeconnection doit deconnecter uniquement pour /login', () => {
    component['gererDeconnection']('/app/dashboard');
    expect(loginServiceMock.setLogged).not.toHaveBeenCalled();

    component['gererDeconnection']('/login');
    expect(loginServiceMock.setLogged).toHaveBeenCalledWith(false);
  });
});
