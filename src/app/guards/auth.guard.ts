import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  const isloggedIn = await auth.IsLoggedIn();

  if (isloggedIn) {
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
