import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Offre } from '../../models/offres.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OffresService } from '../../services/offres.service';

@Component({
  selector: 'app-tableau-des-offres-component',
  templateUrl: './tableau-des-offres-component.html',
  styleUrl: './tableau-des-offres-component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatTableModule, MatButton, MatPaginator, MatPaginatorModule],
})
export class TableauDesOffresComponent implements AfterViewInit, OnInit {
  private readonly offreService = inject(OffresService);
  readonly offres: WritableSignal<Offre[]> = signal([]);
  readonly offreDetails: WritableSignal<{}> = signal({});
  displayedColumns: string[] = ['intituleOffre', 'lieuTravail', 'actions'];
  dataSource = new MatTableDataSource<Offre>(this.offres());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.offreService.search().subscribe((data) => {
      this.offres.set(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public voirDetails(element: Offre) {
    this.offreService.searchDetails(element.identifiantFt).subscribe((data) => {
      this.offreDetails.set(data);
      console.log('Offre details:', data);
    });
  }
}
