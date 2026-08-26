import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { PageTitleService } from '../../services/page-title.service';
import { NavigationItem, UserNavigationItem } from '../../models/navigation.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'ngm-dev-block-nav-with-page-header',
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.css',

  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterOutlet,
    NgOptimizedImage,
    CommonModule,
  ],
})
export class NavigationComponent implements OnInit {
  readonly pageTitleService = inject(PageTitleService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly loginService = inject(LoginService);

  menuNavigation: NavigationItem[] = [
    { name: 'Dashboard', route: '/app/dashboard', current: false },
    { name: 'Chercher une offre', route: '/app/search', current: false },
    { name: 'Mes Offres', route: '/app/mes-offres', current: false },
  ];

  userNavigation: UserNavigationItem[] = [
    { name: 'Mon Profile', route: '/app/mon-profil' },
    { name: 'Se deconnecter', route: '/login' },
  ];

  ngOnInit(): void {
    // Écouter les changements de route enfant
    this.activatedRoute.firstChild?.url.subscribe((segments) => {
      const route = segments[0]?.path;
      this.updateActiveNavigation(route || 'dashboard');
      this.updatePageTitle(route || 'dashboard');
    });
  }

  private updateActiveNavigation(currentRoute: string): void {
    this.menuNavigation.forEach((item) => {
      item.current = item.route.includes(currentRoute);
    });
  }

  private updatePageTitle(route: string): void {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      search: 'Chercher une offre',
      'tableau-des-offres': 'Résultats de recherche',
      'mes-offres': 'Mes Offres',
      'mon-profil': 'Mon Profil',
    };
    this.pageTitleService.setPageTitle(titles[route] || 'Dashboard');
  }

  protected gererDeconnection(route: string) {
    if(route === '/login') {
      this.loginService.setLogged(false);
    }
  }
}
