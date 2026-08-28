import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard-component';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const dashboardServiceMock = {
    getDashboard: vi.fn(),
  };

  const userServiceMock = {
    currentUser: vi.fn(() => ({ id: 7, prenom: 'Test' })),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    dashboardServiceMock.getDashboard.mockReturnValue(of({
      competencesADevelopper: [{ code: 'C1', libelle: 'TypeScript' }],
      matchMoyen: 80,
    }));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit doit charger le dashboard et activer affichagePret', () => {
    expect(component.dashboard().matchMoyen).toBe(80);
    expect(component.affichagePret()).toBe(true);
  });

  it('ngOnInit doit gerer une erreur et afficher un dashboard vide', () => {
    dashboardServiceMock.getDashboard.mockReturnValueOnce(
      throwError(() => new Error('Erreur API'))
    );

    component.ngOnInit();

    expect(component.dashboard()).toEqual({});
    expect(component.affichagePret()).toBe(true);
  });

  it('currentUser doit deleguer au UserService', () => {
    expect(component.currentUser()).toEqual({ id: 7, prenom: 'Test' });
  });

  it('competencesADevelopper doit retourner [] si absent', () => {
    component.dashboard.set({});
    expect(component.competencesADevelopper()).toEqual([]);
  });

  it('allerSurRecherche doit naviguer vers la page de recherche', () => {
    component['allerSurRecherche']();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/app/search']);
  });
});
