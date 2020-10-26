import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';


import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user = {email: '', password: ''};

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    // TODO get userdata from server

    await this.authenticationService.login(this.user.email);
    await this.router.navigate(['user/general']);

    this.user.email = '';
    this.user.password = '';
  }

}
