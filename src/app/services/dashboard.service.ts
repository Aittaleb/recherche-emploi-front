import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { API_DASHBOARD } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  getDashboard() {
    return this.http.get<Dashboard>(API_DASHBOARD);
  }

}
