import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly user: WritableSignal<User> = signal({});

  get currentUser() {
    return this.user.asReadonly();
  }

  setUser(user: User) {
    this.user.set(user);
  }

}
