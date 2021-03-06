import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../../../services/user-management.service';
import {UserData} from '../../../objects/user-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';

@Component({
    selector: 'app-general',
    templateUrl: './general.page.html',
    styleUrls: ['./general.page.scss'],
})
export class GeneralPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public headerColor: string;
    public generalForm: FormGroup;
    public formValid = true;
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
    private user: UserData;

    constructor(private userManagementService: UserManagementService, private formBuilder: FormBuilder, private loadingService: LoadingService,
                private toastService: ToastService, private darkModeService: DarkModeService) {
        super();

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

        this.subscriptions.add(this.userManagementService.getUser().subscribe(user => {
            this.user = user;

            this.generalForm.get('firstname').setValue(this.user.firstname);
            this.generalForm.get('lastname').setValue(this.user.lastname);
        }));

        this.subscriptions.add(this.generalForm.valueChanges.subscribe(() => {
            this.formValid = this.generalForm.valid;
        }));

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));
    }

    async ngOnInit() {
    }

    async updateGeneral() {
        this.generalForm.markAllAsTouched();

        if (this.generalForm.valid) {
            await this.loadingService.showLoading();

            this.user.firstname = this.generalForm.get('firstname').value;
            this.user.lastname = this.generalForm.get('lastname').value;

            const response = await this.userManagementService.updateUser(this.user);

            await this.loadingService.closeLoading();
            await this.toastService.showToast(2000, '', response.message,
                response.success === 1 ? 'success' : 'danger');
        }
    }
}
