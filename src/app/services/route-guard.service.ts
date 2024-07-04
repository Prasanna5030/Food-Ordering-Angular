import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_decode, { jwtDecode } from "jwt-decode";
import { GlobalConstants } from '../shared/global-constants';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(public auth: AuthService,
    public router: Router,
    public snackbarService: SnackbarService
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    debugger
    let expectedRolesArray = route.data['expectedRole'];

    const token: any = localStorage.getItem('token');
    let tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    let expectedRole = '';

    for (let i = 0; i < expectedRolesArray.length; i++) {
      if (expectedRolesArray[i] === tokenPayload.authorities) {
        expectedRole = tokenPayload.authorities;
      }
    }

    if (tokenPayload.authorities === 'user:create,user:read,admin:read,ROLE_ADMIN,admin:create' || tokenPayload.authorities === 'user:create,ROLE_USER,user:read') {
      if (this.auth.isAuthenticated() && tokenPayload.authorities === expectedRole) {
        return true;
      }
      this.snackbarService.openSnackbar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/']);
      return false;
    }
   else {
  this.router.navigate(['/']);
  localStorage.clear();
  return false;
  }
}
}

