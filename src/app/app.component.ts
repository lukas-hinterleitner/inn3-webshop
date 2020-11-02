import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AuthenticationService} from './services/authentication.service';
import {LoadingService} from './services/loading.service';
import {CartService} from './services/cart.service';
import {DarkModeService} from './services/dark-mode.service';

import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public darkMode = false;
    public isLoggedIn = false;
    public productsInCart = 0;
    public currentPath = 'home';
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Products',
            url: '/products',
            icon: 'albums'
        },
        {
            title: 'Shopping Cart',
            url: '/cart',
            icon: 'cart'
        },
    ];

    public authenticationPages = [
        {
            title: 'Login',
            url: '/login',
            icon: 'log-in'
        },
        {
            title: 'Sign Up',
            url: '/signup',
            icon: 'person-add'
        },
    ];

    public userPages = [
        {
            title: 'General',
            url: '/user/general',
            icon: 'person'
        },
        {
            title: 'Payment',
            url: '/user/payment',
            icon: 'card'
        },
        {
            title: 'Address',
            url: '/user/address',
            icon: 'home'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authenticationService: AuthenticationService,
        private router: Router,
        private loadingService: LoadingService,
        private cartService: CartService,
        private darkModeService: DarkModeService
    ) {
        this.darkModeService.darkModeEnabled().subscribe(value => {
            this.darkMode = value;
        });

        this.authenticationService.isLoggedIn().subscribe(value => {
            this.isLoggedIn = value;
        });

        this.cartService.getProductsInCart().subscribe(products => {
            this.productsInCart = products.length;
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentPath = (event as NavigationEnd).url;
            }
        });

        this.initializeApp();
    }

    toggleDarkMode(darkMode) {
        this.darkModeService.toggleDarkTheme(darkMode);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async logout() {
        await this.loadingService.showLoading();

        await this.authenticationService.logout();
        await this.router.navigate(['/login']);

        await this.loadingService.closeLoading();
    }
}
