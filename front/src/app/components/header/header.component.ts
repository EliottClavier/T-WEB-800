import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginUserComponent} from "../../containers/login-user/login-user.component";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {RegisterUserComponent} from "../../containers/register-user/register-user.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private _dialog: MatDialog,
  ) { }

  public openLoginDialog(): void {
    this._dialog.open(LoginUserComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  public openRegisterDialog(): void {
    this._dialog.open(RegisterUserComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }
}
