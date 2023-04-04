import {Component} from '@angular/core';
import {CredentialsModel} from "../../models/credentials/credentials.model";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {LoginConst} from "../../enums/login-const";
import {UserModel} from "../../models/users/user.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {LoginService} from "../../services/login/login.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {RegisterUserComponent} from "../register-user/register-user.component";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent {
  credentials: CredentialsModel;
  loginForm: FormGroup;
  user: UserModel;
  errorMessage: string;
  LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;
  API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(
    private _loginService: LoginService,
    private _authService: AuthService,
    public _dialogRef: MatDialogRef<LoginUserComponent>,
    private _dialog: MatDialog,
  ) {
    this.credentials = new CredentialsModel('', '');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.user = new UserModel(new UserInformationsModel(0, '', '', ''), '');
    this.errorMessage = '';
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this._loginService.postLogin(this.credentials).subscribe({
        next: (result: any) => {
          localStorage.setItem('token', result.token);
          this._authService.getUserByToken(result.token).subscribe(
            (user: UserModel) => {
              this._authService.user = this.user = user;
            }
          );
          this._dialogRef.close();
        },
        error: () => {
          this.errorMessage = this.API_RESPONSE.BAD_CREDENTIALS;
        },
      });
    }
  }

  public openRegisterDialog(): void {
    this._dialogRef.close();
    this._dialog.open (RegisterUserComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  public closeLoginDialog(): void {
    this._dialogRef.close();
  }
}

