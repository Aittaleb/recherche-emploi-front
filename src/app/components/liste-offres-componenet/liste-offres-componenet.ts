import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
  WritableSignal,
  AfterViewInit,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';
import { OffresService } from '../../services/offres.service';
import { map } from 'rxjs';
import { Offre } from '../../models/offres.model';


@Component({
  selector: 'app-liste-offres-componenet',
  templateUrl: './liste-offres-componenet.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [MatListModule, MatDividerModule, NgOptimizedImage],
  styleUrl: './liste-offres-componenet.css',
})
export class ListeOffresComponenet implements OnInit, AfterViewInit {
  private readonly offresService = inject(OffresService);

  offres: WritableSignal<Offre[]> = signal([]);

  ngOnInit(): void {
    this.offresService
      .search()
      .pipe(map((data) => data || []))
      .subscribe((data) => {
        this.offres.set(data);
      });
  }

  ngAfterViewInit(): void {

  }
}

