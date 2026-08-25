import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competence } from '../models/competences.model';
import { API_COMPETENCES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CompetencesService {
  private readonly http = inject(HttpClient);

  getCompetences() {
    return this.http.get<Competence[]>(API_COMPETENCES);
  }

}
