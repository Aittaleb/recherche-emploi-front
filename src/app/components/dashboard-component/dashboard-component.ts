import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dash-board-coeur-de-page-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent {
  readonly patternId = input('nav-with-page-header-pattern-1');
}
