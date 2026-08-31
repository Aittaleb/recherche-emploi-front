import { GestionnaireEtatErreurService, SERVICE_NAME } from './gestionnaire.etat.erreur.service';
import { TestBed } from '@angular/core/testing';
import { ServiceEnErreurStore } from './service-en-erreur.store';

describe('GestionnaireEtatErreurService', () => {
  let service: GestionnaireEtatErreurService<string>;
  let serviceEnErreurStoreMock: any;

  const serviceName = 'testService';
  const serviceEnErreursMock = ['testService', 'anotherService'];

  beforeEach(() => {
    serviceEnErreurStoreMock = {
      lireServicesEnErreur: vi.fn().mockReturnValue(serviceEnErreursMock),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ServiceEnErreurStore, useValue: serviceEnErreurStoreMock },
        { provide: SERVICE_NAME, useValue: serviceName },
      ],
    });
    service = TestBed.inject(GestionnaireEtatErreurService);
  });

  it('doit créer le service', () => {
    expect(service).toBeTruthy();
  });

  it('doit déclarer le service prêt', () => {
    service.declarerServicePret(true);
    expect(service.serviceEstPret()).toBe(true);

    service.declarerServicePret(false);
    expect(service.serviceEstPret()).toBe(false);
  });

  describe.each([
    {serviceEnErreur: ['testService'], expected: true},
    {serviceEnErreur: ['anotherService'], expected: false},
  ])('doit detecter si le service est en erreur', ({serviceEnErreur, expected}) => {
    test(`avec service en erreur: ${serviceEnErreur.join(', ')} => attendu: ${expected}`, () => {
      serviceEnErreurStoreMock.lireServicesEnErreur.mockReturnValue(serviceEnErreur);
      service['majEtatErreurService']();
      const estEnErreur = service.estServiceEnErreur();
      expect(estEnErreur).toBe(expected);
      expect(serviceEnErreurStoreMock.lireServicesEnErreur).toHaveBeenCalled();
    });
  });

});
