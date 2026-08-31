import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceEnErreurStore {

  serviceEnErreur: WritableSignal<string[]> = signal([]);

  ajouterServiceEnErreur(service: string) {
    this.serviceEnErreur.update(services => [...services, service]);
  }

  get lireServicesEnErreur() {
    return this.serviceEnErreur.asReadonly()
  }

  resetStore() {
    this.serviceEnErreur.set([]);
  }
}
