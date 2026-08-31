import { TestBed } from '@angular/core/testing';
import { ServiceEnErreurStore } from './service-en-erreur.store';

describe('ServiceEnErreurStore', () => {
  let store: ServiceEnErreurStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceEnErreurStore],
    });

    store = TestBed.inject(ServiceEnErreurStore);
  });

  afterEach(() => {
    store.resetStore();
  });

  it('doit creer le store', () => {
    expect(store).toBeTruthy();
  });

  it('doit initialiser la liste des services en erreur a vide', () => {
    expect(store.serviceEnErreur()).toEqual([]);
    expect(store.lireServicesEnErreur()).toEqual([]);
  });

  it('doit ajouter un service en erreur', () => {
    store.ajouterServiceEnErreur('offres');

    expect(store.serviceEnErreur()).toEqual(['offres']);
    expect(store.lireServicesEnErreur()).toEqual(['offres']);
  });

  it('doit conserver lordre des ajouts successifs', () => {
    store.ajouterServiceEnErreur('dashboard');
    store.ajouterServiceEnErreur('profil');
    store.ajouterServiceEnErreur('matching');

    expect(store.serviceEnErreur()).toEqual(['dashboard', 'profil', 'matching']);
  });

  it('doit accepter les doublons si le meme service est ajoute plusieurs fois', () => {
    store.ajouterServiceEnErreur('offres');
    store.ajouterServiceEnErreur('offres');

    expect(store.serviceEnErreur()).toEqual(['offres', 'offres']);
  });

  it('doit reinitialiser la liste des services en erreur', () => {
    store.ajouterServiceEnErreur('offres');
    store.ajouterServiceEnErreur('profil');

    store.resetStore();

    expect(store.serviceEnErreur()).toEqual([]);
    expect(store.lireServicesEnErreur()).toEqual([]);
  });
});
