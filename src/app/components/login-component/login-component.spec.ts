import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginComponent } from './login-component';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { CompetencesService } from '../../services/competences.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const routerMock = {
    navigate: vi.fn(() => Promise.resolve(true)),
  };

  const loginServiceMock = {
    setLogged: vi.fn(),
  };

  const userServiceMock = {
    setUser: vi.fn(),
  };

  const competencesServiceMock = {
    getCompetences: vi.fn(() => of([])),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: CompetencesService, useValue: competencesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulaire doit etre invalide par defaut', () => {
    expect(component.form.valid).toBe(false);
  });

  it('onSubmit ne doit rien faire si formulaire invalide', () => {
    component.form.setValue({ email: 'email-invalide', password: '123' });

    component.onSubmit();

    expect(loginServiceMock.setLogged).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(userServiceMock.setUser).not.toHaveBeenCalled();
  });

  it('onSubmit doit connecter et initialiser le profil si formulaire valide', async () => {
    component.form.setValue({ email: 'test@mail.com', password: 'Password1' });

    component.onSubmit();
    await fixture.whenStable();

    expect(loginServiceMock.setLogged).toHaveBeenCalledWith(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/app/dashboard']);
    expect(userServiceMock.setUser).toHaveBeenCalledWith({
      id: 1,
      nom: 'AIT TALEB',
      prenom: 'Abdelhamid',
    });
    expect(competencesServiceMock.getCompetences).toHaveBeenCalled();
  });
});
