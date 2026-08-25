import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfilUtilisateur } from '../models/profil.utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {

  private readonly http = inject(HttpClient);

  getProfilInformation(profilId: number) {
    return this.http.get<ProfilUtilisateur>(`/api/profil/${profilId}`);
  }

  modifierProfil(profilId: number, profil: ProfilUtilisateur) {
    return this.http.put<ProfilUtilisateur>(`/api/profil/${profilId}`, profil);
  }

}
