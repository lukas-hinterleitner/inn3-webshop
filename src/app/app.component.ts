import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AuthenticationService} from './services/authentication.service';
import {LoadingService} from './services/loading.service';
import {CartService} from './services/cart.service';

import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public darkMode: boolean;
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
    ];

    toggleDarkTheme(shouldAdd: boolean) {
        this.darkMode = shouldAdd;
        document.body.classList.toggle('dark', shouldAdd);
    }

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authenticationService: AuthenticationService,
        private router: Router,
        private loadingService: LoadingService,
        private cartService: CartService
    ) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleDarkTheme(prefersDark.matches);

        prefersDark.addEventListener('change', mediaQuery => {
            this.toggleDarkTheme(mediaQuery.matches);
        });

        this.authenticationService.isLoggedIn().subscribe(value => {
            this.isLoggedIn = value;
        });

        this.cartService.getProductsInCart().subscribe(products => {
            this.productsInCart = products.length;
        });

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('/')[1];
        if (path !== undefined) {
            this.currentPath = '/' + path;
        }
    }

    async logout() {
        await this.loadingService.showLoading();

        await this.authenticationService.logout();
        await this.router.navigate(['/login']);

        await this.loadingService.closeLoading();
    }
}
