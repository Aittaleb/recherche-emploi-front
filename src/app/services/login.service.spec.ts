import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn doit etre faux par defaut', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('setLogged doit definir la valeur du signal', () => {
    service.setLogged(true);
    expect(service.isLoggedIn()).toBe(true);

    service.setLogged(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('isLoggedIn doit exposer un signal readonly reactif', () => {
    const readonlySignal = service.isLoggedIn;

    service.setLogged(true);
    expect(readonlySignal()).toBe(true);

    service.setLogged(false);
    expect(readonlySignal()).toBe(false);
  });
});
