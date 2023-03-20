import {Component} from '@angular/core';
import {Credentials} from "../../models/credentials/credentials.model";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {LoginConst} from "../../enums/login-const";
import {User} from "../../models/user/User.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {LoginService} from "../../services/login/login.service";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent {
  credentials: Credentials;
  loginForm: FormGroup;
  success: boolean;
  user: User;
  errorMessage: string;
  LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;
  API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(private _loginService: LoginService) {
    this.credentials = new Credentials('', '');
    this.success = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.user = new User(0, '', '', '');
    this.errorMessage = '';
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this._loginService.postLogin(this.credentials).subscribe({
        next: (value: any) => {
          this.user = value['data'];
          this.success = true;
        },
        error: () => {
          this.errorMessage = this.API_RESPONSE.BAD_CREDENTIALS;
        },
      });
    }
  }

}

