import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceEnErreurService {
  serviceEnErreur: WritableSignal<string[]> = signal([]);

  ajouterServiceEnErreur(service: string) {
    this.serviceEnErreur.update(services => [...services, service]);
  }

  get lireServiceEnErreur() {
    return this.serviceEnErreur.asReadonly();
  }
}
