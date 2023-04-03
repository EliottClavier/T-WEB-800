import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterModel} from "../../models/register/register.model";
import {UserModel} from "../../models/user/user.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  public postUserRegister(user: RegisterModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/register', user);
  }
}
