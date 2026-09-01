import {
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs';
import { BlocErreurComponent } from '../bloc-erreur-component/bloc-erreur-component';
import { ListePropositionsComponent } from './liste-propositions-component/liste-propositions-component';

@Component({
  selector: 'app-dash-board-coeur-de-page-component',
  imports: [
    MatButton,
    MatProgressSpinner,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatChipSet,
    MatChip,
    MatIcon,
    BlocErreurComponent,
    ListePropositionsComponent,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  dashboard: WritableSignal<Dashboard> = signal({});
  affichagePret = computed(() => {
    return this.dashboardService.serviceEstPret() || this.dashboardService.estServiceEnErreur();
  });

  ngOnInit(): void {
    // On initialise le service pour indiquer qu'il n'est pas encore prêt
    this.dashboardService.declarerServicePret(false);
    this.dashboardService
      .getDashboard()
      ?.pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Erreur lors de la récupération du dashboard :', error);
          return [];
        }),
      )
      .subscribe({
        next: (data) => {
          this.dashboard.set(data ?? {});
        },
        error: () => {
          this.dashboard.set({});
        },
      });
  }

  currentUser() {
    return this.userService.currentUser();
  }

  competencesADevelopper() {
    return this.dashboard().competencesADevelopper ?? [];
  }

  protected allerSurRecherche() {
    this.router.navigate(['/app/search']);
  }

  protected affichageEnErreur() {
    return this.dashboardService.estServiceEnErreur();
  }
}
