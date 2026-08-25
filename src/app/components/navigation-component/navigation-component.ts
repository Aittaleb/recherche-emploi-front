import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import {
  DashBoardCoeurDePageComponent
} from '../dash-board-coeur-de-page-component/dash-board-coeur-de-page-component';
import { NgOptimizedImage } from '@angular/common';

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

type UserNavigationItem = {
  name: string;
  href: string;
};

type User = {
  name: string;
  email: string;
  imageUrl: string;
};

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
    DashBoardCoeurDePageComponent,
    NgOptimizedImage,
  ],
})
export class NavigationComponent {
  readonly drawer = viewChild.required<MatDrawer>('drawer');

  user: User = {
    name: 'Abdelhamid Ait Taleb',
    email: 'abdelhamid.ait-taleb@yahoo.fr',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Chercher une offre', href: '#', current: false },
    { name: 'Mes Offres', href: '#', current: false },
  ];

  userNavigation: UserNavigationItem[] = [
    { name: 'Mon Profile', href: '#' },
    { name: 'Se deconnecter', href: '#' },
  ];

  toggleMenu(): void {
    console.log('toggleMenu called');
    this.drawer().toggle();
  }
}
