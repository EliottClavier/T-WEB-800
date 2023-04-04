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
      "jkddxdslz0@dsdcddd.fb"
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
      spyOn<AuthService, any>(service, 'getUserByToken').and.returnValue(new BehaviorSubject(user));

      let fakeToken: string = "fakeToken";
      localStorage.setItem('token', fakeToken);

      service.checkTokenValidity().subscribe(
        (data) => {
          expect(data).toEqual({});
          expect(service["user"]).toEqual(user);
      });

      const req = httpMock.expectOne(`/api/auth/valid-token?token=${fakeToken}`);
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
    spyOn<AuthService, any>(service, 'getUserByToken').and.returnValue('');

    let fakeToken: string = "fakeToken";
    localStorage.setItem('token', fakeToken);

    service.checkTokenValidity().subscribe(
      (data) => {
        expect(data).toEqual('Token is not valid');
    });

    const req = httpMock.expectOne(`/api/auth/valid-token?token=${fakeToken}`);
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

  describe('getUserByToken', () => {
    it('should return user', () => {
      let fakeToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOm51bGwsXCJlbWFpbFwiOlwiamtkZHhkc2x6MEBkc2RjZGRkLmZiXCIsXCJmaXJzdG5hbWVcIjpudWxsLFwibGFzdG5hbWVcIjpudWxsfSIsImlhdCI6MTY4MDYzNTg0MiwiZXhwIjoxNjgwNzIyMjQyfQ.3szim6QahjPpm7Zvv5HitZNLxtaX8N3HL6Xdq0hSbzE";
      localStorage.setItem('token', fakeToken);

      let tokenInfos: any = service["_decodeTokenInfos"](fakeToken);
      let email: string = tokenInfos.email;

      service["getUserByToken"](fakeToken).subscribe(
        (data) => {
          expect(data).toEqual(user);
      });

      const req = httpMock.expectOne(`/api/users/by-email/${user.user.email}`);
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

  describe('_decodeTokenInfos', () => {
    it('should return token infos', () => {
      let fakeToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOm51bGwsXCJlbWFpbFwiOlwiamtkZHhkc2x6MEBkc2RjZGRkLmZiXCIsXCJmaXJzdG5hbWVcIjpudWxsLFwibGFzdG5hbWVcIjpudWxsfSIsImlhdCI6MTY4MDYzNTg0MiwiZXhwIjoxNjgwNzIyMjQyfQ.3szim6QahjPpm7Zvv5HitZNLxtaX8N3HL6Xdq0hSbzE";
      let result = service["_decodeTokenInfos"](fakeToken);
      expect(result).toEqual({
        id: null,
        email: "jkddxdslz0@dsdcddd.fb",
        firstname: null,
        lastname: null,
      });
    });

    it('should return null if token is not valid', () => {
      let fakeToken: string = "fakeToken";
      let result = service["_decodeTokenInfos"](fakeToken);
      expect(result).toEqual(null);
    });
  });
});
