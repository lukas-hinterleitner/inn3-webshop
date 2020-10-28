import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '@ionic/storage';

import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    HAS_LOGGED_IN = 'hasLoggedIn';

    private loggedIn = new BehaviorSubject(false);

    constructor(private storage: Storage, private platform: Platform) {
        this.checkAuthData().then(_ => {});
    }

    async checkAuthData() {
        const loggedIn = await this.storage.get(this.HAS_LOGGED_IN);

        if (loggedIn) {
            this.loggedIn.next(true);
        }
    }

    login(username: string): Promise<any> {
        return this.storage.set(this.HAS_LOGGED_IN, true).then(async () => {
            await this.setUsername(username);
            this.loggedIn.next(true);
            return window.dispatchEvent(new CustomEvent('user:login'));
        });
    }

    signup(username: string): Promise<any> {
        return this.storage.set(this.HAS_LOGGED_IN, true).then(async () => {
            await this.setUsername(username);
            return window.dispatchEvent(new CustomEvent('user:signup'));
        });
    }

    logout(): Promise<any> {
        return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
            this.loggedIn.next(false);
            return this.storage.remove('username');
        }).then(() => {
            window.dispatchEvent(new CustomEvent('user:logout'));
        });
    }

    setUsername(username: string): Promise<any> {
        return this.storage.set('username', username);
    }

    getUsername(): Promise<string> {
        return this.storage.get('username').then((value) => {
            return value;
        });
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn;
    }
}
