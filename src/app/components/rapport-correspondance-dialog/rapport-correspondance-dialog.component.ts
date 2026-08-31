import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OffreDetails } from '../../models/offres.model';
import { RapportCorrespondance } from '../../models/matching.model';
import { Competence } from '../../models/competences.model';
import { OffresService } from '../../services/offres.service';
import { UserService } from '../../services/user.service';

export interface RapportCorrespondanceDialogData {
  offre: OffreDetails;
  rapport: RapportCorrespondance;
}

@Component({
  selector: 'app-rapport-correspondance-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './rapport-correspondance-dialog.component.html',
  styleUrl: './rapport-correspondance-dialog.component.css',
})
export class RapportCorrespondanceDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<RapportCorrespondanceDialogComponent>);
  private readonly offresService = inject(OffresService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  readonly data = inject<RapportCorrespondanceDialogData>(MAT_DIALOG_DATA);


  get scorePercent(): number {
    const score = this.data.rapport.score ?? 0;
    const normalized = score <= 1 ? score * 100 : score;
    return Math.max(0, Math.min(100, Math.round(normalized)));
  }

  get competencesTrouvees(): Competence[] {
    return this.data.rapport.competencesTrouvees ?? [];
  }

  get competencesManquantes(): Competence[] {
    return this.data.rapport.competencesManquantes ?? [];
  }

  get scoreMessage(): string {
    if (this.scorePercent >= 80) return 'Votre profil correspond très bien à cette offre.';
    if (this.scorePercent >= 60) return 'Votre profil correspond bien à cette offre.';
    if (this.scorePercent >= 40) return 'Votre profil correspond partiellement à cette offre.';
    return 'Votre profil correspond encore faiblement à cette offre.';
  }

  fermer(): void {
    this.dialogRef.close();
  }

  ajouterDansFavories(): void {
    const idUtilisateur = this.userService.currentUser().id;
    if (!idUtilisateur || !this.data.offre.identifiantFt)  return;

    this.offresService.sauvegarderOffre(this.data.offre.identifiantFt, idUtilisateur).subscribe(() => {
      this.dialogRef.close(true);
      this.router.navigate(['/app/mes-offres']);
    });
  }
}
