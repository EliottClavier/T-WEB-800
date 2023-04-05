import {AuthService} from "../services/auth/auth.service";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TokenInterceptor} from "../interceptors/token.interceptor";
import {UserModel} from "../models/users/user.model";
import {UserInformationsModel} from "../models/user-informations/user-informations.model";
import {AuthGuard} from "./auth.guard";
import {RouterTestingModule} from "@angular/router/testing";

describe('Auth Guard', () => {
  let authGuard: AuthGuard;
  let _router: Router;
  let auth: AuthService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let user: UserModel = new UserModel(
    new UserInformationsModel(
      1,
      "test",
      "test",
      ""
    ),
    "token"
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthGuard
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    _router = TestBed.inject(Router);
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should have AuthService injected', () => {
    expect(authGuard["_authService"]).toBeDefined();
    expect(authGuard["_authService"]).toBeTruthy();
    expect(authGuard["_authService"]).toEqual(auth);
  });

  it('should have Router injected', () => {
    expect(authGuard["_router"]).toBeDefined();
    expect(authGuard["_router"]).toBeTruthy();
    expect(authGuard["_router"]).toEqual(_router);
  });

  it('should allow access to the route if the user is logged in', () => {
    spyOn<AuthService, any>(auth, 'checkTokenValidity').and.returnValue(new BehaviorSubject({
      user
    }));

    let res: any = authGuard.canActivate()

    expect(auth.checkTokenValidity).toHaveBeenCalled();
    res.subscribe((data: any) => {
      console.log(data)
      console.log(data)
      console.log(data)
    });
  });

  it('should return true when token is valid', () => {
    spyOn(auth, 'checkTokenValidity').and.returnValue(of(true));

    let observable: Observable<any> = authGuard.canActivate() as Observable<any>;
    observable.subscribe(result => {
      expect(result).toEqual(true);
    });
  });

  it('should navigate to "/" when token is not valid', () => {
    spyOn(auth, 'checkTokenValidity').and.returnValue(of("Token is not valid"));
    spyOn(_router, 'navigate');

    let observable: Observable<any> = authGuard.canActivate() as Observable<any>;
    observable.subscribe(
      (result: any) => {
      expect(_router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  it('should navigate to "/" and throw an error when an error occurs', () => {
    spyOn(auth, 'checkTokenValidity').and.returnValue(throwError(() => 'Error'));

    spyOn(_router, 'navigate');

    let observable: Observable<any> = authGuard.canActivate() as Observable<any>;
    observable.subscribe(() => {}, (err) => {
      // expect router.navigate to have been called with ['/']
      expect(_router.navigate).toHaveBeenCalledWith(['/']);
      // expect the error to be thrown
      expect(err).toEqual('Error');
    });
  });

});
