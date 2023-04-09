import { Component } from '@angular/core';
import {UserModel} from "./models/users/user.model";
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(private _authService: AuthService) {
  }


  public ngOnInit(): void {
    this._authService.checkTokenValidity().subscribe(
      (user: UserModel | undefined) => {
        if (user) {
          this._authService.user = user;
        }
      }
    );
  }
}
