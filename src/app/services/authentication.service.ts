import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';

import {UserData} from '../objects/user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';
import {CryptoService} from './crypto.service';
import {RequestOptions} from 'https';
import {repeat} from 'rxjs/operators';

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

    async login(email: string, pwd: string): Promise<AuthInfo> {
        const body = {
            pwd,
            email
        };

        const response = await this.http.post("https://inn3-webshop.lukas-hinterleitner.at/api/login", body).toPromise() as AuthResponse;

        if (response.success === 1) {
            const token = response.token as string;

            const h1 = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            };

            const h2 = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            });

            const userdata = await this.http.get('https://inn3-webshop.lukas-hinterleitner.at/api/user-info', {headers: h2}).toPromise();

            const userData = {
                _firstname: 'Max', _lastname: 'Mustermann', _country: 'Musterland', _city: 'Musterstadt',
                _zip: '1111', _address: 'Musterstraße 1', _email: 'max.mustermann@ma.mu', _password: CryptoService.hashSHA512('maxi1234')
            };

            // await this.storage.set(this.HAS_LOGGED_IN, true);
            // await this.storage.set(this.USER_DATA, userData);

            // this.loggedIn.next(true);

            return {success: false, message: ''};
        } else {
            // @ts-ignore
            return {success: false, message: response.message};
        }
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

    async signup(user: UserData): Promise<AuthInfo> {

        const body = {
            firstname: user._firstname,
            lastname: user._lastname,
            pwd: user._password,
            email: user._email,
            country: user._country,
            city: user._city,
            address: user._address,
            zip: user._zip,
        };

        const response = await this.http.post("https://inn3-webshop.lukas-hinterleitner.at/api/register", body).toPromise() as AuthResponse;

        if (response.success === 1) {
            return {success: true, message: response.message};
        } else {
            return {success: false, message: response.message};
        }
    }
}

export interface AuthInfo {
    success: boolean;
    message: string;
}

export interface AuthResponse {
    success: number;
    status: number;
    message: string;
    token: string;
}
