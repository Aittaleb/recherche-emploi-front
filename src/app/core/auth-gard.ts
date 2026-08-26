import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const loginService = inject(LoginService);
  return loginService.isLoggedIn();
};
