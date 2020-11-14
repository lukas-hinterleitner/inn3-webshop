import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';

import {UserData} from '../objects/user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends UnsubscribeOnDestroyAdapter {
    private HAS_LOGGED_IN = 'hasLoggedIn';
    private USER_DATA = 'USER_DATA';
    private USER_TOKEN = 'USER_TOKEN';

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

        const response = await this.http.post('https://inn3-webshop.lukas-hinterleitner.at/api/login', body).toPromise() as AuthResponse;

        if (response.success === 1) {
            const token = response.token as string;

            const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            });

            const userDataResponse = await this.http.get('https://inn3-webshop.lukas-hinterleitner.at/api/user-info',
                {headers: httpHeaders}).toPromise() as UserDataResponse;

            if (userDataResponse.success === 1) {
                const user = userDataResponse.user;

                const userData = {
                    _firstname: user.firstname,
                    _lastname: user.lastname,
                    _email: user.email,
                    _country: user.country,
                    _city: user.city,
                    _address: user.address,
                    _zip: user.zip,
                } as UserData;


                this.loggedIn.next(true);
                this.user.next(userData);
                await this.storage.set(this.USER_TOKEN, token);
                await this.storage.set(this.USER_DATA, userData);
                await this.storage.set(this.HAS_LOGGED_IN, true);

                return {success: true, message: 'Successfully logged in!'};
            } else {
                return {success: false, message: 'Error getting user info. Please contact an admin!'};
            }
        } else {
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

        const response = await this.http.post('https://inn3-webshop.lukas-hinterleitner.at/api/register', body).toPromise() as AuthResponse;

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

export interface UserDataResponse {
    status: number;
    success: number;
    user: {
        firstname: string;
        lastname: string;
        email: string;
        country: string;
        city: string;
        address: string;
        zip: string;
    };
}
