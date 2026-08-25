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

  sauvegarderOffre(idOffre: string, idUtilisateur: number) {
    const url = `/api/favorites/${idOffre}/user/${idUtilisateur}`;
    return this.httpClient.post(url, {});
  }

  supprimerOffre(idTechnique: number, idUtilisateur: number) {
    const url = `/api/favorites/${idTechnique}/user/${idUtilisateur}`;
    return this.httpClient.delete(url);
  }
}
