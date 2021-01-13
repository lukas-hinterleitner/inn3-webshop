import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../signup/signup.page';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {UserData} from '../../../objects/user-data';
import {UserManagementService} from '../../../services/user-management.service';
import {CryptoService} from '../../../services/crypto.service';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.page.html',
    styleUrls: ['./password.page.scss'],
})
export class PasswordPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public headerColor: string;
    public passwordForm: FormGroup;
    public formValid: boolean;
    public validation_messages = {
        // old password
        /*current_password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
            {type: 'wrong_password', message: 'Passwords do not match.'}
        ],*/

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
    private user: UserData;

    constructor(private formBuilder: FormBuilder, private loadingService: LoadingService, private toastService: ToastService,
                private userManagementService: UserManagementService, private darkModeService: DarkModeService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        this.subscriptions.add(this.userManagementService.getUser().subscribe(user => {
            this.user = user;
        }));

        // create form group
        this.passwordForm = this.formBuilder.group({
            // old password
            /*current_password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])],*/

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
                // this.PasswordValidator('current_password'),
                ConfirmedValidator('new_password', 'confirm_new_password'),
            ]
        });

        this.subscriptions.add(this.passwordForm.valueChanges.subscribe(() => {
            this.formValid = this.passwordForm.valid;
        }));
    }

    ngOnInit() {
    }

    async updatePassword() {
        this.passwordForm.markAllAsTouched();

        if (this.passwordForm.valid) {
            await this.loadingService.showLoading();

            this.user.pwd = this.passwordForm.get('new_password').value;

            const response = await this.userManagementService.updateUser(this.user);

            await this.loadingService.closeLoading();
            await this.toastService.showToast(2000, '', response.message,
                response.success === 1 ? 'success' : 'danger');
        }
    }

    private PasswordValidator(controlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.wrong_password) {
                return;
            }

            if (CryptoService.hashSHA512(control.value) !== this.user.pwd) {
                control.setErrors({wrong_password: true});
            } else {
                control.setErrors(null);
            }
        };
    }
}
