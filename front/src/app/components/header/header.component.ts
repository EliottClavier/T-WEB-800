import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginUserComponent} from "../../containers/login-user/login-user.component";
import {NoopScrollStrategy} from "@angular/cdk/overlay";
import {AuthService} from "../../services/auth/auth.service";
import {UserModel} from "../../models/users/user.model";
import {Router} from "@angular/router";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LocationModel} from "../../models/location/location.model";
import {TripService} from "../../services/trip/trip.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public opened: boolean = false;
  public user: UserModel | undefined = undefined;
  public showFiller: boolean = false;
  public sub: Subscription = new Subscription();

  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
    private tripBuilderService: TripBuilderService,
    private router: Router,
    private tripService: TripService
  ) { }

  public ngOnInit(): void {
    this.sub = this._authService.userObservable.subscribe(
      (user: UserModel | undefined) => {
        if (user) {
          this.user = user;
          this.sub.unsubscribe();
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
  public isUserConnected(): boolean {
    return this._authService.isLoggedIn();
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
