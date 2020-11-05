import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserData} from '../../../objects/user-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-general',
    templateUrl: './general.page.html',
    styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
    private user: UserData;

    public generalForm: FormGroup;

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
    };

    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {
        // create form group
        this.generalForm = this.formBuilder.group({
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
        });

        this.authService.getUser().pipe(take(1)).subscribe(user => {
            this.user = user;

            this.generalForm.get('firstname').setValue(this.user._firstname);
            this.generalForm.get('lastname').setValue(this.user._lastname);

            console.log(this.user);
        });
    }

    async ngOnInit() {}

    async updateGeneral() {
        this.generalForm.markAllAsTouched();

        // TODO send update request to server

        this.user._firstname = this.generalForm.get('firstname').value;
        this.user._lastname = this.generalForm.get('lastname').value;

        console.log(this.user);

        await this.authService.updateUser(this.user);
    }
}
