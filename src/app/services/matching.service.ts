import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RapportCorrespondance } from '../models/matching.model';

@Injectable({
  providedIn: 'root',
})
export class MatchingService {
  private readonly http = inject(HttpClient);

  getMatchingInformation(profilId: number, offreId: string) {
    return this.http.get<RapportCorrespondance>(`/api/matching/${profilId}/offre/${offreId}`);
  }
}
