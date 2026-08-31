import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_RECHERCHE } from '../constants/api.constants';
import { Offre, OffreDetails } from '../models/offres.model';
import { GestionnaireEtatErreurService } from '../core/gestionnaire.etat.erreur.service';
import { catchError, map, of } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class OffresService extends GestionnaireEtatErreurService<string> {
  private readonly httpClient = inject(HttpClient);
  private readonly toasterService = inject(ToasterService);

  constructor() {
    super('offres');
  }

  search(query: string = '') {
    const params: HttpParams = new HttpParams().set('query', query).set('serviceName', 'offres');
    return this.httpClient.get<Offre[]>(API_RECHERCHE, { params }).pipe(
      map((offres) => {
        this.declarerServicePret();
        return offres;
      }),
      catchError((err) => {
        console.error('Erreur dans recherche des offres: ', err);
        this.declarerServicePret();
        return of([]);
      }),
    );
  }

  searchDetails(idOffre: string) {
    const params = new HttpParams().set('serviceName', 'offres');
    return this.httpClient.get<OffreDetails>(API_RECHERCHE + '/' + idOffre, { params }).pipe(
      map((offres) => {
        this.declarerServicePret();
        return offres;
      }),
      catchError((err) => {
        console.error('Erreur dans details: ', err);
        this.declarerServicePret();
        return of({});
      })
    );
  }

  getOffresFavorites(idUtilisateur: number) {
    const params = new HttpParams().set('serviceName', 'offres');
    return this.httpClient
      .get<Offre[]>(`/api/offres/favorites/user/${idUtilisateur}`, { params })
      .pipe(
        map((offres) => {
          this.declarerServicePret();
          return offres;
        }),
        catchError((err) => {
          console.error('Erreur dans mes offres favorites: ', err);
          this.declarerServicePret();
          return of([]);
        })
      );
  }

  sauvegarderOffre(idOffre: string, idUtilisateur: number) {
    const url = `/api/offres/favorites/${idOffre}/user/${idUtilisateur}`;
    return this.httpClient.post(url, {}).pipe(
      catchError((err) => {
        console.error('Erreur lors de l\'ajout aux favoris: ', err);
        this.toasterService.showToast('Erreur lors de l\'ajout aux favoris');
        return of(null);
      })
    );
  }

  supprimerOffre(idTechnique: number | null , idUtilisateur: number | undefined) {
    console.log('supprimerOffre', idTechnique, idUtilisateur);
    if(!idTechnique || !idUtilisateur) {
      throw new Error('identifiant technique ou utilisateur manquant pour supprimer l\'offre');
    }
    const url = `/api/offres/favorites/${idTechnique}/user/${idUtilisateur}`;
    return this.httpClient.delete(url).pipe(
      catchError((err) => {
        console.error('Erreur lors de la suppression des favoris: ', err);
        this.toasterService.showToast('Erreur lors de la suppression des favoris');
        return of(null);
      })
    )
  }
}
