import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dash-board-coeur-de-page-component',
  imports: [MatButton, MatDivider, NgIf, MatProgressSpinner],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  dashboard: WritableSignal<Dashboard> = signal({});
  affichagePret = signal(false);

  ngOnInit(): void {
    this.dashboardService.getDashboard()?.subscribe((data) => {
      this.dashboard.set(data);
      this.affichagePret.set(true);
    });
  }

  currentUser() {
    return this.userService.currentUser();
  }

  protected allerSurRecherche() {
    this.router.navigate(['/app/search']);
  }
}
