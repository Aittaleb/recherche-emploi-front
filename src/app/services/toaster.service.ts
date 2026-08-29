import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  private readonly messageToast = signal('');

  showToast(message: string) {
    this.messageToast.set(message);
  }

  constructor() {
    effect(() => {
      const message = this.messageToast();
      if (message) {
        this._snackBar.open(message, 'Fermer', {
          duration: 3000,
        });
        this.messageToast.set('');
      }
    });
  }
}
