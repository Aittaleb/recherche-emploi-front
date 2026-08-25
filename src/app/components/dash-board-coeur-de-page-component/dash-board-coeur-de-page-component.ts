import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dash-board-coeur-de-page-component',
  imports: [],
  templateUrl: './dash-board-coeur-de-page-component.html',
  styleUrl: './dash-board-coeur-de-page-component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashBoardCoeurDePageComponent {
  readonly patternId = input('nav-with-page-header-pattern-1');
}
