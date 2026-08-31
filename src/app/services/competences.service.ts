import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competence } from '../models/competences.model';
import { API_COMPETENCES } from '../constants/api.constants';
import { catchError, of, tap } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class CompetencesService {
  private readonly http = inject(HttpClient);
  private readonly toasterService = inject(ToasterService);
  private readonly CACHE_KEY = 'rome_competences_cache';

  /**
   * Retourne les compétences ROME.
   * Utilise le localStorage comme cache pour éviter de ré-appeler l'API à chaque visite.
   * Vider la clé 'rome_competences_cache' pour forcer un rechargement.
   */
  getCompetences() {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached) {
      return of(JSON.parse(cached) as Competence[]);
    }
    return this.http.get<Competence[]>(API_COMPETENCES).pipe(
      tap((competences) => localStorage.setItem(this.CACHE_KEY, JSON.stringify(competences))),
      catchError((error) => {
        this.toasterService.showToast("Erreur lors du chargement des compétences ROME. Veuillez réessayer plus tard.");
        console.error('Erreur lors du chargement des compétences ROME :', error);
        return [];
      }),
    );
  }

}
