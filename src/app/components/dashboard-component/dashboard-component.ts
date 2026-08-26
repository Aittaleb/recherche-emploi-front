import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dash-board-coeur-de-page-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  dashboard: WritableSignal<Dashboard> = signal({});

  readonly patternId = input('nav-with-page-header-pattern-1');

  ngOnInit(): void {
    this.dashboardService.getDashboard()?.subscribe((data => {
      this.dashboard.set(data);
    }));
  }

}
