import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { API_DASHBOARD } from '../constants/api.constants';
import { UserService } from './user.service';
import { GestionnaireEtatErreurService } from '../core/gestionnaire.etat.erreur.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends GestionnaireEtatErreurService<string> {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);

  constructor() {
    super('dashboard');
  }
  getDashboard() {
    const user = this.userService.currentUser();
    const params: HttpParams = new HttpParams().set('serviceName', 'dashboard');
    if (user?.id) {
      return this.http.get<Dashboard>(API_DASHBOARD + '/' + user.id, { params }).pipe(
        map((dashboard) => {
          this.declarerServicePret();
          return dashboard;
        }),
        catchError((err) => {
          console.error('Erreur dans dashboard: ', err);
          this.declarerServicePret();
          return of({});
        }),
      );
    }
    return null;
  }
}
