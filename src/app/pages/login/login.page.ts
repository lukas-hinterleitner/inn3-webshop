import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoadingService} from '../../services/loading.service';

import {CryptoService} from '../../services/crypto.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public formValid: boolean;

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
                private loadingService: LoadingService) {
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

        this.loginForm.valueChanges.subscribe(() => {
            this.formValid = this.loginForm.valid;
        });
    }

    ngOnInit() {
    }

    async login() {
        await this.loadingService.showLoading();

        if (this.loginForm.valid) {
            const email: string = this.loginForm.get('email').value;
            const password: string = CryptoService.hashSHA512(this.loginForm.get('password').value);

            // TODO encryption
            // TODO get userdata from server
            // without password

            // improvised userdata
            const userData = {
                _firstname: 'Max', _lastname: 'Mustermann', _country: 'Musterland', _city: 'Musterstadt',
                _zip: '1111', _address: 'Musterstraße 1', _email: 'max.mustermann@ma.mu', _password: CryptoService.hashSHA512('maxi1234')
            };

            await this.authenticationService.login(userData);
            await this.router.navigate(['/user/general']);
        } else {
            // TODO view error messages
            this.loginForm.markAllAsTouched();
        }

        await this.loadingService.closeLoading();
    }
}
