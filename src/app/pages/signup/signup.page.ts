import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserData} from '../../objects/user-data';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    public signupForm: FormGroup;

    public validation_messages = {
        // name
        firstname: [
            {type: 'required', message: 'Firstname is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 255 characters.'},
        ],
        lastname: [
            {type: 'required', message: 'Lastname is required.'},
            {type: 'minlength', message: 'Must have at least 3 characters.'},
            {type: 'maxlength', message: 'Maximum 255 characters.'},
        ],
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


        // credentials
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'email', message: 'Wrong email format.'},
        ],
        confirm_email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'email', message: 'Wrong email format.'},
            {type: 'confirmed', message: 'Emails must be equal.'},
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
        ],
        confirm_password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Must have at least 8 characters.'},
            {type: 'confirmed', message: 'Passwords do not match.'}
        ],
    };

    constructor(private formBuilder: FormBuilder) {
        // create form group
        this.signupForm = this.formBuilder.group({
            // name
            firstname: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ])],
            lastname: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ])],

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

            // credentials
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
            ])],
            confirm_email: ['', Validators.compose([
                Validators.required,
                Validators.email,
            ])],
            password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])],
            confirm_password: ['', Validators.compose([
                Validators.minLength(8),
                Validators.required,
            ])]

        }, {
            validators: [
                ConfirmedValidator('email', 'confirm_email'),
                ConfirmedValidator('password', 'confirm_password'),
            ]
        });
    }

    ngOnInit() {
    }

    signup() {
        this.signupForm.markAllAsTouched();

        const user = {
            _firstname: this.signupForm.get('firstname').value,
            _lastname: this.signupForm.get('lastname').value,
            _country : this.signupForm.get('country').value,
            _city : this.signupForm.get('city').value,
            _zip : this.signupForm.get('zip').value,
            _address : this.signupForm.get('address').value,
            _email : this.signupForm.get('email').value,
            _password : this.signupForm.get('password').value,
        };

        console.log(user);

        // TODO send user data to server
    }

}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmed: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}
