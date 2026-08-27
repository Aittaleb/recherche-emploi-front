import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
  ],
})
export class TableauDesOffresSauvegardeesComponent implements AfterViewInit, OnInit {
  private readonly offreService = inject(OffresService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  readonly offres: WritableSignal<Offre[]> = signal([]);
  readonly offreDetails: WritableSignal<OffreDetails | null> = signal(null);
  readonly sidenavOpen: WritableSignal<boolean> = signal(false);
  readonly affichagePret = signal(false);
  displayedColumns: string[] = ['intituleOffre', 'lieuTravail', 'actions'];
  dataSource = new MatTableDataSource<Offre>(this.offres());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.offres();
    });
  }

  ngOnInit(): void {
    const idUtilisateur = this.userService.currentUser().id;
    if (idUtilisateur) {
      this.offreService.getOffresFavorites(idUtilisateur).subscribe((data) => {
        this.offres.set(data);
        this.affichagePret.set(true);
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public voirDetails(element: Offre) {
    this.offreService.searchDetails(element.identifiantFt).subscribe((data) => {
      data.id = element.id;
      this.offreDetails.set(data);
      this.sidenavOpen.set(true);
    });
  }

  public closeSidenav() {
    this.sidenavOpen.set(false);
  }

  public revenirVersRecherche() {
    this.router.navigate(['/app/search']);
  }

  protected supprimerOffreFavorite(details: OffreDetails) {
    this.offreService
      .supprimerOffre(details.id, this.userService.currentUser().id)
      .subscribe(() => {
        this.closeSidenav();
        this.offres.set(this.offres().filter((offre) => offre.id !== details.id));
      });
  }
}
