import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';

import {UserData} from '../objects/user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService extends UnsubscribeOnDestroyAdapter {
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

        const response = await this.http.post<AuthResponse>('https://inn3-webshop.lukas-hinterleitner.at/api/login', body).toPromise();

        if (response.success === 1) {
            const token = response.token as string;

            const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            });

            const userDataResponse = await this.http.get<UserDataResponse>('https://inn3-webshop.lukas-hinterleitner.at/api/user-info',
                {headers: httpHeaders}).toPromise();

            if (userDataResponse.success === 1) {
                const userData = userDataResponse.user;

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

    async updateUser(user: UserData): Promise<Response> {
        const response = await this.http.put<Response>('https://inn3-webshop.lukas-hinterleitner.at/api/users', user,
            {}).toPromise();

        if (response.status === 1) {
            await this.storage.remove(this.USER_DATA);
            await this.storage.set(this.USER_DATA, user);
            this.user.next(user);
        }

        return response;
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn;
    }

    async signup(user: UserData): Promise<AuthInfo> {

        const body = {
            firstname: user.firstname,
            lastname: user.lastname,
            pwd: user.pwd,
            email: user.email,
            country: user.country,
            city: user.city,
            address: user.address,
            zip: user.zip,
        };

        const response = await this.http.post<AuthResponse>('https://inn3-webshop.lukas-hinterleitner.at/api/register', body).toPromise();

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

export interface Response {
    success: number;
    status: number;
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
    user: UserData;
    /*user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        country: string;
        city: string;
        address: string;
        zip: string;
    };*/
}
