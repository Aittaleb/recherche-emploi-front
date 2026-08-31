import { effect, Inject, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { ServiceEnErreurStore } from './service-en-erreur.store';

export const SERVICE_NAME = new InjectionToken<string>('SERVICE_NAME');

@Injectable({
  providedIn: 'root'
})
export class GestionnaireEtatErreurService<T extends string> {
  private readonly serviceEnErreurStore = inject(ServiceEnErreurStore);
  protected serviceEnErreur = signal(false);
  protected servicePret = signal(false);

  constructor(@Inject(SERVICE_NAME) private serviceName: T) {
    effect(() => {
      this.majEtatErreurService();
    });
  }

  public declarerServicePret(etat: boolean = true) {
    this.servicePret.set(etat);
  }

  private majEtatErreurService() {
    const servicesEnErreur: string[] = this.serviceEnErreurStore.lireServicesEnErreur();
    this.serviceEnErreur.set(servicesEnErreur.includes(this.serviceName));
  }

  get estServiceEnErreur() {
    return this.serviceEnErreur.asReadonly();
  }

  get serviceEstPret() {
    return this.servicePret.asReadonly();
  }
}
