import { Component, OnInit } from '@angular/core';

import {Platform, ViewWillEnter} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;

  public darkMode = true;
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
      title: 'Cart',
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

  toggleDarkTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme();

    prefersDark.addEventListener('change', mediaQuery => {
      this.toggleDarkTheme();
    });

    this.authenticationService.isLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
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
    await this.authenticationService.logout();
    await this.router.navigate(['/login']);
  }
}
