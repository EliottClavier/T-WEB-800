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


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent {
  credentials: Credentials;
  loginForm: FormGroup;
  success: boolean;
  readonly LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;

  constructor() {
    this.credentials = new Credentials('', '');
    this.success = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.success = true;
    }
  }

}

