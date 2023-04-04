import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserModel} from "../../models/users/user.model";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";
import {BehaviorSubject} from "rxjs";

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
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
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = new AuthService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have HttpClient injected', () => {
    expect(service["http"]).toBeDefined();
    expect(service["http"]).toBeTruthy();
    expect(service["http"]).toEqual(http);
  });

  describe('checkTokenValidity', () => {
    beforeEach(() => {
      localStorage.removeItem('token');
    });

    it('should return an error Observable if token does not exist in localStorage', () => {
      service.checkTokenValidity().subscribe(data => {
        expect(data).toEqual('No token found');
      });
    });

    it('should retrieve user if token is valid', () => {
      spyOn<AuthService, any>(service, '_getUserByToken').and.returnValue(new BehaviorSubject(user));

      let fakeToken: string = "fakeToken";
      localStorage.setItem('token', fakeToken);

      service.checkTokenValidity().subscribe(
        (data) => {
          expect(data).toEqual({});
          expect(service["user"]).toEqual(user);
      });

      const req = httpMock.expectOne(`/api/auth/valid-token`);
      expect(req.request.method).toEqual('GET');
      req.flush(
        {}, {
          headers: {
            Authorization: `Bearer ${fakeToken}`,
            WWW_Authenticate: `Basic`
          },
          status: 200,
          statusText: 'OK'
        }
      );
    });
  });

  it('should return error message when token is not valid', () => {
    spyOn<AuthService, any>(service, '_getUserByToken').and.returnValue('');

    let fakeToken: string = "fakeToken";
    localStorage.setItem('token', fakeToken);

    service.checkTokenValidity().subscribe(
      (data) => {
        expect(data).toEqual('Token is not valid');
    });

    const req = httpMock.expectOne(`/api/auth/valid-token`);
    expect(req.request.method).toEqual('GET');
    req.flush(
      {}, {
        headers: {
          Authorization: `Bearer ${fakeToken}`,
          WWW_Authenticate: `Basic`
        },
        status: 400,
        statusText: 'Bad Request'
      }
    );
  });

  describe('_getUserByToken', () => {
    it('should return user', () => {
      let fakeToken: string = "fakeToken";
      localStorage.setItem('token', fakeToken);

      service["_getUserByToken"](fakeToken).subscribe(
        (data) => {
          expect(data).toEqual(user);
      });

      const req = httpMock.expectOne(`/api/users/me`);
      expect(req.request.method).toEqual('GET');
      req.flush(
        user, {
          headers: {
            Authorization: `Bearer ${fakeToken}`,
            WWW_Authenticate: `Basic`
          },
          status: 200,
          statusText: 'OK'
        }
      );
    });
  });

  describe('_user', () => {
    it('should set and return user', () => {
      service.user = user;
      expect(service.user).toEqual(service["user"]);

      service.user = undefined;
      expect(service.user).toEqual(undefined);
    });
  });
});
