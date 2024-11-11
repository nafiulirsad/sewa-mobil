import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authApiService = inject(AuthApiService);
  const router = inject(Router);

  if (!authApiService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  authApiService.verifyToken().subscribe(
    response => {
      return true;
    },
    error => {
      router.navigate(['/login']);
      return false;
    }
  );

  return true;
};
