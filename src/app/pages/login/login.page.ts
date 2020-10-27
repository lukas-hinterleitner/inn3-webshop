import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;

    public validation_messages = {
        email: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Wrong email format.' },
        ],
        password: [
            { type: 'required', message: 'Password is required.' }
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
    }

    ngOnInit() {
    }

    async login() {
        await this.loadingService.showLoading();

        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;

            // TODO encryption
            // TODO password hashing
            // TODO get userdata from server

            await this.authenticationService.login(email);
            await this.router.navigate(['/user/general']);
        } else {
            // TODO view error messages
            this.loginForm.markAllAsTouched();
        }

        await this.loadingService.closeLoading();
    }
}
