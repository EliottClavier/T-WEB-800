import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginUserComponent} from "../../containers/login-user/login-user.component";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {AuthService} from "../../services/auth/auth.service";
import {UserModel} from "../../models/users/user.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: UserModel | undefined = undefined;

  public showFiller: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    if (this._authService.user) {
      this.user = this._authService.user;
    } else {
      this._authService.checkTokenValidity();
      this.user = this._authService.user;
    }
  }

  public disconnect(): void {
    this._authService.disconnect();
    this.user = undefined;
  }

  public openLoginDialog(): void {
    this._dialog.open(LoginUserComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }

}
