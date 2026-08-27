import {
  ChangeDetectionStrategy,
  Component,
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
  affichagePret = signal(false);

  ngOnInit(): void {
    this.dashboardService
      .getDashboard()
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.dashboard.set(data ?? {});
          this.affichagePret.set(true);
        },
        error: () => {
          this.dashboard.set({});
          this.affichagePret.set(true);
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
}
