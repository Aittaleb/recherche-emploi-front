import { Component, inject, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-mon-profil-component',
  imports: [],
  templateUrl: './mon-profil-component.html',
  styleUrl: './mon-profil-component.css',
})
export class MonProfilComponent implements OnInit {
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('Mon Profil');
  }
}
