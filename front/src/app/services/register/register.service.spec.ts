import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Observable} from "rxjs";
import {Register} from "../../models/register/register.model";

describe('RegisterService', () => {
  let service: RegisterService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [RegisterService],
    });
    service = TestBed.inject(RegisterService);
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

  it('should have postUserRegister method', () => {
    expect(service.postUserRegister).toBeDefined();
    expect(service.postUserRegister).toBeTruthy();
    expect(service.postUserRegister).toEqual(jasmine.any(Function));
  });

  it('should have postUserRegister method that returns an Observable', () => {
    let user = new Register('Albert', 'Test', 'test@gmail.com', 'Password123');
    expect(service.postUserRegister(user)).toEqual(jasmine.any(Observable));
  });

  it('should post user register', () => {
    let user = new Register('Albert', 'Test', 'test@gmail.com', 'Password123');
    service.postUserRegister(user).subscribe(data => {
      expect(typeof data).toEqual('object');
      expect(data).toEqual(jasmine.objectContaining({
        firstName: 'Albert',
        lastName: 'Test',
        email: 'test@gmail.com',
        password: 'Password123'
      }));
    });

    const req = httpMock.expectOne(`/api/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(user, { status: 201, statusText: 'OK' });
  });
});
