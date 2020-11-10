import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';

import {UserData} from '../objects/user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends UnsubscribeOnDestroyAdapter{
    private HAS_LOGGED_IN = 'hasLoggedIn';
    private USER_DATA = 'USER_DATA';

    private loggedIn = new ReplaySubject<boolean>(1);
    private user = new ReplaySubject<UserData>(1); // set buffer size to 1, so the last ONE update will be cached

    constructor(private storage: Storage, private http: HttpClient) {
        super();

        this.checkAuthData();
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

        const headers = new HttpHeaders();

        headers.set('Access-Control-Allow-Origin', 'https://inn3-webshop.lukas-hinterleitner.at/api/');

        this.subscriptions.add(this.http.get('https://inn3-webshop.lukas-hinterleitner.at/api/', {
            headers
        }).subscribe(data => {
            console.log(data);
        }));


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
