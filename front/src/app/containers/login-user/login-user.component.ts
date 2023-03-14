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
import {RegisterConst} from "../../enums/register-const";
import {ApiResponseConst} from "../../enums/api-response-const";


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
  INFO_MESSAGES = new RegisterConst().INFO_MESSAGES;
  API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor() {
    this.credentials = new Credentials('', '');
    this.success = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.user = new User(0, '', '', '');
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.success = true;
    }
  }

}

