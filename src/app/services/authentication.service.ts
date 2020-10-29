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

    async login(username: string): Promise<any> {
        // TODO login and check data from server

        await this.storage.set(this.HAS_LOGGED_IN, true);
        this.loggedIn.next(true);
        return window.dispatchEvent(new CustomEvent('user:login'));
    }

    async logout(): Promise<any> {
        await this.storage.remove(this.HAS_LOGGED_IN);
        this.loggedIn.next(false);
        window.dispatchEvent(new CustomEvent('user:logout'));
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn;
    }
}
