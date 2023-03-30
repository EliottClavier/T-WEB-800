import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RegisterModel} from "../../models/register/register.model";
import {User} from "../../models/user/User.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  public postUserRegister(user: RegisterModel): Observable<Object> {
    return this.http.post<Object>('/api/auth/register', user);
  }
}
