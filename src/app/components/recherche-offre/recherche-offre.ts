import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-recherche-offre',
  imports: [FormsModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './recherche-offre.html',
  styleUrl: './recherche-offre.css',
})
export class RechercheOffre implements OnInit {
  private readonly router = inject(Router);
  private readonly pageTitleService = inject(PageTitleService);
  protected query: string = '';

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('Chercher une offre');
  }

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
