import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_RECHERCHE } from '../constants/api.constants';
import { Offre, OffreDetails } from '../models/offres.model';

@Injectable({
  providedIn: 'root',
})
export class OffresService {
  private readonly httpClient = inject(HttpClient);

  search(query: string = '') {
    const params: HttpParams = new HttpParams().set('query', query);
    return this.httpClient.get<Offre[]>(API_RECHERCHE, { params });
  }

  searchDetails(idOffre: string) {
    return this.httpClient.get<OffreDetails>(API_RECHERCHE + '/' + idOffre);
  }

  getOffresFavorites(idUtilisateur: number) {
    return this.httpClient.get<Offre[]>(`/api/offres/favorites/user/${idUtilisateur}`);
  }

  sauvegarderOffre(idOffre: string, idUtilisateur: number) {
    const url = `/api/offres/favorites/${idOffre}/user/${idUtilisateur}`;
    return this.httpClient.post(url, {}).subscribe(() => {
      console.log('Offre sauvegardée avec succès');
    });
  }

  supprimerOffre(idTechnique: number | null , idUtilisateur: number | undefined) {
    console.log('supprimerOffre', idTechnique, idUtilisateur);
    if(!idTechnique || !idUtilisateur) {
      return;
    }
    const url = `/api/offres/favorites/${idTechnique}/user/${idUtilisateur}`;
    console.log('supprimerOffre url', url);
    return this.httpClient.delete(url).subscribe(() => {
      console.log('Offre supprimée avec succès');
    });
  }
}
