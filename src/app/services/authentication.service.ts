import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';

import {UserData} from '../objects/user-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private HAS_LOGGED_IN = 'hasLoggedIn';
    private USER_DATA = 'USER_DATA';

    private loggedIn = new BehaviorSubject(false);
    private user = new ReplaySubject<UserData>(1); // set buffer size to 1, so the last ONE update will be cached

    constructor(private storage: Storage) {
        this.checkAuthData().then(_ => {});
    }

    async checkAuthData() {
        const loggedIn = await this.storage.get(this.HAS_LOGGED_IN);

        if (loggedIn) {
            this.loggedIn.next(true);
        }

        const user = await this.storage.get(this.USER_DATA);

        if (user) {
            this.user.next(user);
        }
    }

    async login(userData: UserData): Promise<any> {
        // TODO login and check data from server

        await this.storage.set(this.HAS_LOGGED_IN, true);
        await this.storage.set(this.USER_DATA, userData);
        this.loggedIn.next(true);
        return window.dispatchEvent(new CustomEvent('user:login'));
    }

    async logout(): Promise<any> {
        await this.storage.remove(this.HAS_LOGGED_IN);
        await this.storage.remove(this.USER_DATA);
        this.loggedIn.next(false);
        window.dispatchEvent(new CustomEvent('user:logout'));
    }

    getUser() {
        return this.user;
    }

    async updateUser(user: UserData) {
        await this.storage.remove(this.USER_DATA);
        await this.storage.set(this.USER_DATA, user);
        this.user.next(user);
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn;
    }
}
