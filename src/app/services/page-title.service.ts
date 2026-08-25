import { Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  readonly pageTitle: WritableSignal<string> = signal('Dashboard');

  setPageTitle(title: string) {
    this.pageTitle.set(title);
  }

}

