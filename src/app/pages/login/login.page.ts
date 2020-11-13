import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoadingService} from '../../services/loading.service';

import {CryptoService} from '../../services/crypto.service';
import {DarkModeService} from '../../services/dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../../utilities/unsubscribe-on-destroy-adapter';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public headerColor: string;

    public loginForm: FormGroup;
    public formValid: boolean;

    public serverMessage: string;

    public validation_messages = {
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'email', message: 'Wrong email format.'},
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must have minimum 8 characters'},
        ],
    };

    constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
                private loadingService: LoadingService, private darkModeService: DarkModeService, private http: HttpClient) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        // create form group
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
            ])],
            password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])]
        });

        this.subscriptions.add(this.loginForm.valueChanges.subscribe(() => {
            this.formValid = this.loginForm.valid;
        }));
    }

    ngOnInit() {
    }

    async login() {
        await this.loadingService.showLoading();

        if (this.loginForm.valid) {
            const email: string = this.loginForm.get('email').value;
            const password: string = this.loginForm.get('password').value;

            const response = await this.authenticationService.login(email, password);

            if (response.success) {
                await this.router.navigate(['/user/general']);
            } else {
                this.serverMessage = response.message;
            }
        } else {
            this.loginForm.markAllAsTouched();
        }

        await this.loadingService.closeLoading();
    }
}
