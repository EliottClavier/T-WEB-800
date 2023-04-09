import {HeaderComponent} from './header.component'
import {SimpleButtonComponent} from "../buttons/simple-button/simple-button.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppModule} from "../../app.module";
import {UserModel} from "../../models/users/user.model";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {getIsoStringFromDate} from "../../utils/date.utils";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;
  let _dialog: MatDialog;
  let _authService: AuthService;
  let router: Router;
  let tripBuilderService: TripBuilderService;

  const dialogMock = {
    close: () => {
    },
    open: () => {
    }
  };

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [
      AppModule
    ],
    declarations: [
      HeaderComponent,
      SimpleButtonComponent
    ],
    providers: [
      {provide: MatDialogRef, useValue: dialogMock},
      Router,
      TripBuilderService
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    _dialog = spectator.inject(MatDialog);
    _authService = spectator.inject(AuthService);

    router = spectator.inject(Router);
    tripBuilderService = spectator.inject(TripBuilderService);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should have Dialog service', () => {
    expect(component["_dialog"]).toBeDefined();
    expect(component["_dialog"]).toBeTruthy();
    expect(component["_dialog"]).toEqual(_dialog);
  });

  it('should have Auth service', () => {
    expect(component["_authService"]).toBeDefined();
    expect(component["_authService"]).toBeTruthy();
    expect(component["_authService"]).toEqual(_authService);
  });

  it('should open login dialog', () => {
    spyOn<HeaderComponent, any>(component, 'openLoginDialog').and.callThrough();
    spyOn<MatDialog, any>(component["_dialog"], 'open').and.callThrough();
    component.openLoginDialog();
    spectator.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalled();
    expect(component["_dialog"].open).toHaveBeenCalled();
  });

  it('should open login dialog on click', () => {
    component.user = undefined;
    spyOn<HeaderComponent, any>(component, 'openLoginDialog').and.callThrough();
    spyOn<MatDialog, any>(component["_dialog"], 'open').and.callThrough();
    spectator.click('[header-login] button');
    spectator.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalled();
    expect(component["_dialog"].open).toHaveBeenCalled();
  });

  it('should disconnect', () => {
    let user: UserModel = new UserModel(
      new UserInformationsModel(
        1,
        "test",
        "test",
        "jkddxdslz0@dsdcddd.fb"
      ),
      "token"
    );
    component.user = user;
    spyOn<HeaderComponent, any>(component, 'disconnect').and.callThrough();
    spectator.click('[header-login] button');
    spectator.detectChanges();
    expect(component.disconnect).toHaveBeenCalled();
    expect(component.user).toBeUndefined();
  });

  it('should retrieve user without user in AuthService', () => {
    let user: UserModel = new UserModel(
      new UserInformationsModel(
        1,
        "test",
        "test",
        "",
      ),
      "token"
    );

    spyOn<AuthService, any>(_authService, 'checkTokenValidity').and.callFake(() => {
      _authService.user = user;
    });

    component.ngOnInit();
    spectator.detectChanges();
    expect(component.user).toEqual(user);
  });

  it('should retrieve user with user in AuthService', () => {
    let user: UserModel = new UserModel(
      new UserInformationsModel(
        1,
        "test",
        "test",
        "",
      ),
      "token"
    );

    _authService.user = user;
    component.ngOnInit();
    spectator.detectChanges();
    expect(component.user).toEqual(user);
  });


  it('should navigate to the home page and reset the trip builder', () => {
    const router = spectator.inject(Router);
    spyOn(router, 'navigate');
    const tripBuilderService = spectator.inject(TripBuilderService);
    spyOn(tripBuilderService, 'newTrip');
    spectator.component.home();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(tripBuilderService.newTrip).toHaveBeenCalled();
  });

  it('should navigate to the "My Trips" page', () => {
    const router = spectator.inject(Router);
    spyOn(router, 'navigate');
    spectator.component.myTrips();
    expect(router.navigate).toHaveBeenCalledWith(['/my-trips']);

  });

  it('should navigate to explore if location is provided', () => {
    spyOn(tripBuilderService, 'newTrip');
    spyOn(router, 'navigate');

    const location = {
      name: 'Test Location',
      lat: 10,
      lng: 20,
    };

    const start = new Date(2023, 4, 10);
    const end = new Date(2023, 4, 20);

    tripBuilderService.searchFormsArray.value[0].location=location  ;
    tripBuilderService.searchFormsArray.value[0].start = getIsoStringFromDate(start);
    tripBuilderService.searchFormsArray.value[0].end = getIsoStringFromDate(end);

    spectator.component.home();

    expect(tripBuilderService.newTrip).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith(
  //     ['/', 'explore', location.name],
  //     {
  //       queryParams: {
  //         start: getIsoStringFromDate(start),
  //         end: getIsoStringFromDate(end),
  //         lat: location.lat,
  //         lng: location.lng,
  //       },
  //     }
  //   );
  });

  it('should navigate to home if location is not provided', () => {
    spyOn(tripBuilderService, 'newTrip');
    spyOn(router, 'navigate');

    tripBuilderService.searchFormsArray.value[0] = { location: null };

    spectator.component.home();

    expect(tripBuilderService.newTrip).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
})
