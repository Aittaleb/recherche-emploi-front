import { Component, inject, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-bloc-erreur-component',
  imports: [NgOptimizedImage, MatButton],
  templateUrl: './bloc-erreur-component.html',
  styleUrl: './bloc-erreur-component.css',
})
export class BlocErreurComponent {
  private readonly router = inject(Router);
  @Input() activerRefreshButton: boolean = true;

  reloadLarouteActuelle() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
