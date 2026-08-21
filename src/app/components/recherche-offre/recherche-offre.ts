import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RechercheService } from '../../services/recherche.service';
import { FormsModule } from '@angular/forms';
import { ResultatRecherche } from '../../models/resultat.recherche.model';

@Component({
  selector: 'app-recherche-offre',
  imports: [FormsModule],
  templateUrl: './recherche-offre.html',
  styleUrl: './recherche-offre.css',
})
export class RechercheOffre implements OnInit {
  private readonly rechercheService = inject(RechercheService);

  resultats: WritableSignal<ResultatRecherche[]> = signal([]);
  protected query: string = '';

  ngOnInit(): void {}

  rechercherParMotCle(query: string) {
    this.rechercheService.search(query).subscribe((data) => {
      this.resultats.set(data);
    });
  }
}
