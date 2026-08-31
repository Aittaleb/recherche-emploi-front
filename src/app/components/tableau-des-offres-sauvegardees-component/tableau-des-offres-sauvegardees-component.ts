import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Offre, OffreDetails } from '../../models/offres.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OffresService } from '../../services/offres.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatchingService } from '../../services/matching.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RapportCorrespondanceDialogComponent } from '../rapport-correspondance-dialog/rapport-correspondance-dialog.component';
import { ToasterService } from '../../services/toaster.service';
import { BlocErreurComponent } from '../bloc-erreur-component/bloc-erreur-component';

@Component({
  selector: 'app-tableau-des-offres-component',
  templateUrl: './tableau-des-offres-sauvegardees-component.html',
  styleUrl: './tableau-des-offres-sauvegardees-component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatTableModule,
    MatButton,
    MatPaginator,
    MatPaginatorModule,
    MatSidenavModule,
    MatIcon,
    CommonModule,
    MatDivider,
    MatIconButton,
    MatProgressSpinner,
    MatDialogModule,
    BlocErreurComponent,
  ],
})
export class TableauDesOffresSauvegardeesComponent implements AfterViewInit, OnInit {
  private readonly offreService = inject(OffresService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly matchingService = inject(MatchingService);
  private readonly dialog = inject(MatDialog);
  private readonly toasterService = inject(ToasterService);
  readonly offres: WritableSignal<Offre[]> = signal([]);
  readonly offreDetails: WritableSignal<OffreDetails | null> = signal(null);
  readonly sidenavOpen: WritableSignal<boolean> = signal(false);
  readonly affichagePret = computed(() => {
    return this.offreService.serviceEstPret() || this.offreService.estServiceEnErreur();
  });
  displayedColumns: string[] = ['intituleOffre', 'lieuTravail', 'actions'];
  dataSource = new MatTableDataSource<Offre>(this.offres());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.offres();
    });
  }

  ngOnInit(): void {
    this.offreService.declarerServicePret(false);
    const idUtilisateur = this.userService.currentUser().id;
    if (idUtilisateur) {
      this.offreService.getOffresFavorites(idUtilisateur).subscribe((data) => {
        this.offres.set(data);
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public voirDetails(offre: Offre) {
    if (offre.identifiantFt) {
      this.offreService.searchDetails(offre.identifiantFt).subscribe((data: OffreDetails) => {
        data.id = offre.id;
        this.offreDetails.set(data);
        this.sidenavOpen.set(true);
      });
    }
  }

  public closeSidenav() {
    this.sidenavOpen.set(false);
  }

  public revenirVersRecherche() {
    this.router.navigate(['/app/search']);
  }

  protected supprimerOffreFavorite(details: OffreDetails) {
    if (details.id) {
      this.offreService
        .supprimerOffre(details.id, this.userService.currentUser().id)
        .subscribe(() => {
          this.closeSidenav();
          this.offres.set(this.offres().filter((offre) => offre.id !== details.id));
          this.toasterService.showToast('Offre supprimée des favoris avec succès !');
        });
    }
  }

  // TODO: factoriser la gestion du sidenave dans un composant séparé
  protected genererRapportCorrespondance(details: OffreDetails) {
    const idUtilisateur = this.userService.currentUser().id;
    if (!idUtilisateur || !details.identifiantFt) {
      return;
    }

    this.matchingService
      .getMatchingInformation(idUtilisateur, details.identifiantFt)
      .subscribe((rapport) => {
        this.dialog.open(RapportCorrespondanceDialogComponent, {
          width: '640px',
          maxWidth: '92vw',
          maxHeight: '90vh',
          autoFocus: false,
          panelClass: 'rapport-dialog-panel',
          data: {
            offre: details,
            rapport,
          },
        });
      });
  }

  protected affichageEnErreur() {
    return this.offreService.estServiceEnErreur();
  }
}
