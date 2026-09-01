import { Component, Input } from '@angular/core';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';
import { Offre } from '../../../models/offres.model';

@Component({
  selector: 'app-liste-propositions-component',
  imports: [MatDivider, MatListItem, MatList],
  templateUrl: './liste-propositions-component.html',
  styleUrl: './liste-propositions-component.css',
})
export class ListePropositionsComponent {
  @Input() offresProposees: Offre[] = [];
}
