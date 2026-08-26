import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-offre',
  imports: [FormsModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './recherche-offre.html',
  styleUrl: './recherche-offre.css',
})
export class RechercheOffre {
  private readonly router = inject(Router);
  protected query: string = '';

  rechercherParMotCle(query: string) {
    this.router.navigate(['/app/tableau-des-offres'], { queryParams: { query } });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.rechercherParMotCle(this.query);
    }
  }
}
