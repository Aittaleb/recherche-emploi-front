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
import { MatButton } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Offre, OffreDetails } from '../../models/offres.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OffresService } from '../../services/offres.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-tableau-des-offres-component',
  templateUrl: './tableau-des-offres-component.html',
  styleUrl: './tableau-des-offres-component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatTableModule, MatButton, MatPaginator, MatPaginatorModule, MatSidenavModule, MatIcon, CommonModule, MatDivider],
})
export class TableauDesOffresComponent implements AfterViewInit, OnInit {
  private readonly offreService = inject(OffresService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageTitleService = inject(PageTitleService);
  readonly offres: WritableSignal<Offre[]> = signal([]);
  readonly offreDetails: WritableSignal<OffreDetails | null> = signal(null);
  readonly sidenavOpen: WritableSignal<boolean> = signal(false);
  displayedColumns: string[] = ['intituleOffre', 'lieuTravail', 'actions'];
  dataSource = new MatTableDataSource<Offre>(this.offres());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.offres();
    });
  }

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('Résultats de recherche');
    this.activatedRoute.queryParams.subscribe((params) => {
      const query = params['query'] || '';
      this.offreService.search(query).subscribe((data) => {
        this.offres.set(data);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public voirDetails(element: Offre) {
    this.offreService.searchDetails(element.identifiantFt).subscribe((data) => {
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
}
