import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { PageTitleService } from '../../services/page-title.service';
import { NavigationItem, UserNavigationItem } from '../../models/navigation.model';
import { LoginService } from '../../services/login.service';
import { ServiceEnErreurStore } from '../../core/service-en-erreur.store';

@Component({
  selector: 'ngm-dev-block-nav-with-page-header',
  templateUrl: './navigation-layout-component.html',
  styleUrl: './navigation-layout-component.css',

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
export class NavigationLayoutComponent {
  readonly pageTitleService = inject(PageTitleService);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly serviceEnErreurStore = inject(ServiceEnErreurStore);

  titlesMap: Map<string, string> = new Map<string, string>([
    ['/app/dashboard', 'Dashboard'],
    ['/app/search', 'Chercher une offre'],
    ['/app/tableau-des-offres', 'Résultats de recherche'],
    ['/app/mes-offres', 'Mes Offres'],
    ['/app/mon-profil', 'Mon Profil'],
  ]);

  menuNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      route: '/app/dashboard',
      activeIfRoutes: ['/app/dashboard'],
      current: false,
    },
    {
      name: 'Chercher une offre',
      route: '/app/search',
      activeIfRoutes: ['/app/search', '/app/tableau-des-offres'],
      current: false,
    },
    {
      name: 'Mes Offres',
      route: '/app/mes-offres',
      activeIfRoutes: ['/app/mes-offres'],
      current: false,
    },
  ];

  userNavigation: UserNavigationItem[] = [
    { name: 'Mon Profile', route: '/app/mon-profil' },
    { name: 'Se deconnecter', route: '/login' },
  ];

  constructor() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url.split(';queryParams')[0].split('?')[0];
      this.updatePageTitle(currentRoute);
      this.updateActiveNavigation(currentRoute);
      this.serviceEnErreurStore.resetStore();
    });
  }

  private updateActiveNavigation(currentRoute: string): void {
    this.menuNavigation.forEach((item) => {
      item.current = item.activeIfRoutes.includes(currentRoute);
    });
  }

  private updatePageTitle(route: string): void {
    this.pageTitleService.setPageTitle(this.titlesMap.get(route) || 'Job Matcher');
  }

  protected gererDeconnection(route: string) {
    if (route === '/login') {
      this.loginService.setLogged(false);
    }
  }
}
