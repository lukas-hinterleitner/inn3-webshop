import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserData} from '../../../objects/user-data';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class AddressPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    private user: UserData;

    public headerColor: string;

    public addressForm: FormGroup;
    public formValid = true;
    public validation_messages = {
        // address
        country: [
            {type: 'required', message: 'Country is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 255 characters.'},
        ],
        city: [
            {type: 'required', message: 'City is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 255 characters.'},
        ],
        zip: [
            {type: 'required', message: 'ZIP Code is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 12 characters.'},
        ],
        address: [
            {type: 'required', message: 'Address is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 255 characters.'},
        ],
    };

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private loadingService: LoadingService,
                private toastService: ToastService, private darkModeService: DarkModeService) {
        super();

        // create form group
        this.addressForm = this.formBuilder.group({
            // address
            country: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ])],
            city: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ])],
            zip: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(12),
            ])],
            address: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ])],
        });

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        this.subscriptions.add(this.authService.getUser().subscribe(user => {
            this.user = user;

            this.addressForm.get('country').setValue(this.user._country);
            this.addressForm.get('city').setValue(this.user._city);
            this.addressForm.get('zip').setValue(this.user._zip);
            this.addressForm.get('address').setValue(this.user._address);
        }));

        this.subscriptions.add(this.addressForm.valueChanges.subscribe(() => {
            this.formValid = this.addressForm.valid;
        }));
    }

    ngOnInit() {}

    async updateAddress() {
        this.addressForm.markAllAsTouched();

        if (this.addressForm.valid) {
            await this.loadingService.showLoading();

            // TODO send update request to server

            this.user._country = this.addressForm.get('country').value;
            this.user._city = this.addressForm.get('city').value;
            this.user._zip = this.addressForm.get('zip').value;
            this.user._address = this.addressForm.get('address').value;

            await this.authService.updateUser(this.user);

            await this.loadingService.closeLoading();
            await this.toastService.showToast(2000, '', 'Successfully updated!', 'success');
        }
    }

}
