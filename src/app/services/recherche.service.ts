import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_RECHERCHE } from '../constants/api.constants';
import { ResultatRecherche } from '../models/resultat.recherche.model';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  private readonly httpClient = inject(HttpClient);

  search(query: string) {
    const params: HttpParams = new HttpParams();
    params.set('query', query)
    return this.httpClient.get<ResultatRecherche>(API_RECHERCHE, { params });
  }

}
