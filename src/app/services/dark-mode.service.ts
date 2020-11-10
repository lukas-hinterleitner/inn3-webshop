import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    private darkMode = new ReplaySubject<boolean>(1);
    private headerColor = new ReplaySubject<string>(1);

    private DARK_MODE_STORAGE_KEY = 'DARK_MODE_STORAGE_KEY';

    constructor(private storage: Storage) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleDarkTheme(prefersDark.matches);

        prefersDark.addEventListener('change', async mediaQuery => {
            await this.toggleDarkTheme(mediaQuery.matches);
        });

        this.storage.get(this.DARK_MODE_STORAGE_KEY).then(async value => {
            await this.toggleDarkTheme(value);
        });
    }

    toggleDarkTheme(shouldAdd: boolean) {
        document.body.classList.toggle('dark', shouldAdd);
        this.darkMode.next(shouldAdd);

        if (shouldAdd) {
            this.headerColor.next('');
            this.storage.set(this.DARK_MODE_STORAGE_KEY, true);
        }
        else {
            this.headerColor.next('primary');
            this.storage.set(this.DARK_MODE_STORAGE_KEY, false);
        }
    }

    darkModeEnabled() {
        return this.darkMode;
    }

    getHeaderColor() {
        return this.headerColor;
    }
}
