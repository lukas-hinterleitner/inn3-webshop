import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

import {ToastService} from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private isLoggedIn = false;

  constructor(private authenticationService: AuthenticationService, private toastService: ToastService) {
    this.authenticationService.isLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('auth guard access to', next.url.toString(), 'granted:', this.isLoggedIn);
    return this.isLoggedIn;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.isLoggedIn) {
      this.toastService.showToast(3000, 'Error!', 'Log in to access this page.', 'warning').then(() => {});
    }

    return this.isLoggedIn;
  }
}
