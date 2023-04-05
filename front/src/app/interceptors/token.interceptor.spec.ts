import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";
import {AuthService} from "../services/auth/auth.service";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "../models/users/user.model";
import {UserInformationsModel} from "../models/user-informations/user-informations.model";
import {Router} from "@angular/router";

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let _router: Router;
  let auth: AuthService;
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
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    _router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('intercept', () => {
    it('should return request without Authorization header', () => {
      httpClient.get('/api/location/search/Test/test').subscribe();

      const req = httpMock.expectOne(`/api/location/search/Test/test`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
      httpMock.verify();

      expect(req.request.headers.has('Authorization')).toBeFalse();
    });

    it('should return request with Authorization and WWW_Authenticate header', () => {
      localStorage.setItem('token', 'fakeToken');
      spyOn<AuthService, any>(auth, 'checkTokenValidity').and.returnValue(new BehaviorSubject({
        user
      }));
      httpClient.get('/api/trips').subscribe();

      const req = httpMock.expectOne('/api/trips');
      expect(req.request.method).toEqual('GET');
      req.flush({});
      httpMock.verify();

      expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
      expect(req.request.headers.get('WWW_Authenticate')).toEqual('Basic');
    });

    it('should redirect to / if token is invalid for secured routes', async () => {
      localStorage.setItem('token', 'fakeToken');
      spyOn<AuthService, any>(auth, 'checkTokenValidity').and.returnValue(
        throwError(() => {
          return { status: 401 }
        })
      );
      spyOn<Router, any>(_router, 'navigate').and.stub();

      httpClient.get('/api/trips').subscribe(
        () => {},
        (err) => {
          expect(err.status).toEqual(401);
          expect(_router.navigate).toHaveBeenCalledWith(['/']);
        }
      );
    });
  });
});
