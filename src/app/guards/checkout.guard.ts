import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CartService} from '../services/cart.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CheckoutGuard implements CanActivate, CanLoad {
    constructor(private cartService: CartService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.cartService.getProductsInCart().pipe(map(value => {
            return value.length > 0;
        }));
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        return this.cartService.getProductsInCart().pipe(map(value => {
            return value.length > 0;
        }));
    }
}
