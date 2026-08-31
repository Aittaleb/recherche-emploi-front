import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProfilUtilisateur } from '../models/profil.utilisateur.model';
import { GestionnaireEtatErreurService } from '../core/gestionnaire.etat.erreur.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService extends GestionnaireEtatErreurService<string> {
  private readonly http = inject(HttpClient);

  constructor() {
    super('profil');
  }

  getProfilInformation(profilId: number) {
    const params = new HttpParams().set('serviceName', 'profil');
    return this.http.get<ProfilUtilisateur>(`/api/profil/${profilId}`, { params }).pipe(
      map((profil) => {
        this.declarerServicePret();
        return profil;
      }),
      catchError((err) => {
        console.error('Erreur dans profil: ', err);
        this.declarerServicePret();
        return throwError(() => err);
      }),
    );
  }

  modifierProfil(profilId: number, profil: ProfilUtilisateur) {
    return this.http.put<ProfilUtilisateur>(`/api/profil/${profilId}`, profil);
  }
}
