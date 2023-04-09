import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginUserComponent} from "../../containers/login-user/login-user.component";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {AuthService} from "../../services/auth/auth.service";
import {UserModel} from "../../models/users/user.model";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {FormArray} from "@angular/forms";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LocationModel} from "../../models/location/location.model";

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
    private _authService: AuthService,
    private tripBuilderService: TripBuilderService,
    private router: Router
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

  myTrips() {
    this.router.navigate(['/my-trips']);

  }

  home() {

    let location : LocationModel  = this.tripBuilderService?.searchFormsArray.value[0].location;
    let start : Date = this.tripBuilderService?.searchFormsArray.value[0].start;
    let end : Date = this.tripBuilderService?.searchFormsArray.value[0].end;
    console.log('header location : ', location);

    location && this.router.navigate(
      ['/', 'explore', location.name],
      {
        queryParams: {
          start: getIsoStringFromDate(start),
          end: getIsoStringFromDate(end),
          lat: location.lat,
          lng: location.lng,
        }
      }
    );

    this.router.navigate(['/']);
  }
}
