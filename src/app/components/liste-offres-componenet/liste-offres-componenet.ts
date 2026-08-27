import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';
import { OffresService } from '../../services/offres.service';
import { Offre, OffreDetails } from '../../models/offres.model';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-liste-offres-componenet',
  templateUrl: './liste-offres-componenet.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    MatListModule,
    MatDividerModule,
    NgOptimizedImage,
    MatSidenavContainer,
    MatIcon,
    MatSidenav,
    MatButton,
    MatProgressSpinner,
    MatIconButton,
  ],
  styleUrl: './liste-offres-componenet.css',
})
export class ListeOffresComponenet implements OnInit {
  private readonly offresService = inject(OffresService);
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly sidenavOpen: WritableSignal<boolean> = signal(false);
  readonly offreDetails: WritableSignal<OffreDetails | null> = signal(null);
  offres: WritableSignal<Offre[]> = signal([]);
  affichagePret = signal(false);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const query = params['query'] || '';
      this.offresService.search(query).subscribe((data) => {
        this.offres.set(data);
        this.affichagePret.set(true);
      });
    });
  }

  public voirDetails(element: Offre) {
    this.offresService.searchDetails(element.identifiantFt).subscribe((data) => {
      this.offreDetails.set(data);
      this.sidenavOpen.set(true);
    });
  }

  public closeSidenav() {
    this.sidenavOpen.set(false);
  }

  protected revenirVersRecherche() {
    this.router.navigate(['/app/search']);
  }

  private allerDansOffresFavories() {
    this.router.navigate(['/app/mes-offres']);
  }

  protected ajouterDansFavories(details: OffreDetails) {
    const idUtilisateur = this.userService.currentUser().id;
    if (idUtilisateur) {
      this.offresService.sauvegarderOffre(details.identifiantFt, idUtilisateur).subscribe(() => {
        this.closeSidenav();
        this.allerDansOffresFavories();
      });
    }
  }
}

