import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  logged = signal(false)

  get isLoggedIn() {
    return this.logged.asReadonly();
  }

  setLogged(value: boolean) {
    this.logged.set(value);
  }

}
