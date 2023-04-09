import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginUserComponent} from "../../containers/login-user/login-user.component";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {AuthService} from "../../services/auth/auth.service";
import {UserModel} from "../../models/users/user.model";
import {take, tap} from "rxjs";
import {Router} from "@angular/router";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {FormArray} from "@angular/forms";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LocationModel} from "../../models/location/location.model";
import {TripService} from "../../services/trip/trip.service";

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
    private router: Router,
    private tripService: TripService
  ) { }

  public ngOnInit(): void {
    let sub = this._authService.userObservable.subscribe(
      (user: UserModel | undefined) => {
        if (user) {
          console.log(user)
          this.user = user;
          console.log(user)
          sub.unsubscribe();
        }
      }
    )
  }

  public disconnect(): void {
    this._authService.disconnect();
    this.user = undefined;
    this.router.navigate(['/']);
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
    this.tripBuilderService.newTrip()
    this.router.navigate(['/']);
  }
}
