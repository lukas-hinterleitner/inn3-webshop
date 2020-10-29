import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkMode = new BehaviorSubject(false);

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme(prefersDark.matches);

    prefersDark.addEventListener('change', mediaQuery => {
      this.toggleDarkTheme(mediaQuery.matches);
    });
  }

  toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
    this.darkMode.next(shouldAdd);
  }

  darkModeEnabled() {
    return this.darkMode;
  }
}
