import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {Observable} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Credentials} from "../../models/credentials/credentials.model";

describe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have HttpClient injected', () => {
    expect(service["http"]).toBeDefined();
    expect(service["http"]).toBeTruthy();
    expect(service["http"]).toEqual(http);
  });

  it('should have postLogin method', () => {
    expect(service.postLogin).toBeDefined();
    expect(service.postLogin).toBeTruthy();
    expect(service.postLogin).toEqual(jasmine.any(Function));
  });

  it('should have postLogin method that returns an Observable', () => {
    let credentials = new Credentials('test@gmail.com', 'Password123');
    expect(service.postLogin(credentials)).toEqual(jasmine.any(Observable));
  });

  it('should post user login', () => {
    let credentials = new Credentials('test@gmail.com', 'Password123');
    service.postLogin(credentials).subscribe(data => {
      expect(typeof data).toEqual('object');
      expect(data).toEqual(jasmine.objectContaining({
        email: 'test@gmail.com',
        password: 'Password123'
      }));
    });

    const req = httpMock.expectOne(`/api/auth/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(credentials, { status: 201, statusText: 'OK' });
  });
});
