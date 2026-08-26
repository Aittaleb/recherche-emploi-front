import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { API_DASHBOARD } from '../constants/api.constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);

  getDashboard() {
    const user = this.userService.currentUser();
    if (user?.id) {
      return this.http.get<Dashboard>(API_DASHBOARD + '/' + user.id);
    }
    return null;
  }

}
