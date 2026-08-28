import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('currentUser doit etre vide par defaut', () => {
    expect(service.currentUser()).toEqual({});
  });

  it('setUser doit mettre a jour le signal currentUser', () => {
    service.setUser({ id: 1, nom: 'AIT TALEB', prenom: 'Abdelhamid' });

    expect(service.currentUser()).toEqual({
      id: 1,
      nom: 'AIT TALEB',
      prenom: 'Abdelhamid',
    });
  });

  it('currentUser readonly doit refleter les mises a jour successives', () => {
    const readonlySignal = service.currentUser;

    service.setUser({ id: 2, nom: 'Dupont' });
    expect(readonlySignal()).toEqual({ id: 2, nom: 'Dupont' });

    service.setUser({ id: 3, prenom: 'Amine' });
    expect(readonlySignal()).toEqual({ id: 3, prenom: 'Amine' });
  });
});

