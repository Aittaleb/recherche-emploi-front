import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { NavigationComponent } from './components/navigation-component/navigation-component';
import { MonProfilComponent } from './components/mon-profil-component/mon-profil-component';
import { ListeOffresComponenet } from './components/liste-offres-componenet/liste-offres-componenet';
import { TableauDesOffresComponent } from './components/tableau-des-offres-component/tableau-des-offres-component';
import { RechercheOffre } from './components/recherche-offre/recherche-offre';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: NavigationComponent },
  { path: 'search', component: RechercheOffre },
  { path: 'mon-profil', component: MonProfilComponent },
  { path: 'mes-offres', component: ListeOffresComponenet },
  { path: 'tableau-des-offres', component: TableauDesOffresComponent },
];
