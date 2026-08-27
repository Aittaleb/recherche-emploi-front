import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { NavigationLayoutComponent } from './components/navigation-layout-component/navigation-layout-component';
import { MonProfilComponent } from './components/mon-profil-component/mon-profil-component';
import { TableauDesOffresSauvegardeesComponent } from './components/tableau-des-offres-sauvegardees-component/tableau-des-offres-sauvegardees-component';
import { RechercheOffre } from './components/recherche-offre/recherche-offre';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { authGuard } from './core/auth-gard';
import { ListeOffresResultatsComponenet } from './components/liste-offres-resultats-componenet/liste-offres-resultats-componenet';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: NavigationLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'search', component: RechercheOffre },
      { path: 'tableau-des-offres', component: ListeOffresResultatsComponenet },
      { path: 'mes-offres', component: TableauDesOffresSauvegardeesComponent },
      { path: 'mon-profil', component: MonProfilComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
