import {Component} from '@angular/core';
import {Credentials} from "../../models/credentials/credentials.model";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {LoginConst} from "../../enums/login-const";
import {User} from "../../models/user/User.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {LoginService} from "../../services/login/login.service";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent {
  public credentials: Credentials;
  public loginForm: FormGroup;
  public user: User;
  public errorMessage: string;
  public LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;
  public API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(
    private _loginService: LoginService,
    public _dialogRef: MatDialogRef<LoginUserComponent>
  ) {
    this.credentials = new Credentials('', '');
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
          this._dialogRef.close();
        },
        error: () => {
          this.errorMessage = this.API_RESPONSE.BAD_CREDENTIALS;
        },
      });
    }
  }

}

