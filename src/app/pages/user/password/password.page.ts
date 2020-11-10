import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../signup/signup.page';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {UserData} from '../../../objects/user-data';
import {AuthenticationService} from '../../../services/authentication.service';
import {CryptoService} from '../../../services/crypto.service';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.page.html',
    styleUrls: ['./password.page.scss'],
})
export class PasswordPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    private user: UserData;

    public headerColor: string;

    public passwordForm: FormGroup;
    public formValid: boolean;

    public validation_messages = {
        // old password
        current_password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
            {type: 'wrong_password', message: 'Passwords do not match.'}
        ],

        // new password
        new_password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
        ],
        confirm_new_password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
            {type: 'confirmed', message: 'Passwords do not match.'}
        ],
    };

    constructor(private formBuilder: FormBuilder, private loadingService: LoadingService, private toastService: ToastService,
                private authService: AuthenticationService, private darkModeService: DarkModeService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        this.subscriptions.add(this.authService.getUser().subscribe(user => {
            this.user = user;
        }));

        // create form group
        this.passwordForm = this.formBuilder.group({
            // old password
            current_password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])],

            // new password
            new_password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])],
            confirm_new_password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])]

        }, {
            validators: [
                this.PasswordValidator('current_password'),
                ConfirmedValidator('new_password', 'confirm_new_password'),
            ]
        });

        this.subscriptions.add(this.passwordForm.valueChanges.subscribe(() => {
            this.formValid = this.passwordForm.valid;
        }));
    }

    private PasswordValidator(controlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.wrong_password) {
                return;
            }

            if (CryptoService.hashSHA512(control.value) !== this.user._password) {
                control.setErrors({wrong_password: true});
            } else {
                control.setErrors(null);
            }
        };
    }

    ngOnInit() {}

    async updatePassword() {
        this.passwordForm.markAllAsTouched();

        if (this.passwordForm.valid) {
            await this.loadingService.showLoading();


            await this.loadingService.closeLoading();
            await this.toastService.showToast(2000, '', 'Successfully updated!', 'success');
        }
    }
}
