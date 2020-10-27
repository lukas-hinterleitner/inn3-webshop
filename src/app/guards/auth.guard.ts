import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private isLoggedIn = false;

  constructor(private authenticationService: AuthenticationService) {
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
    // console.log('auth guard access to', segments.toString(), 'granted:', this.isLoggedIn);
    return this.isLoggedIn;
  }
}
