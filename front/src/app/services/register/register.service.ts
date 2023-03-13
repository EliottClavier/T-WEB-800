import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Register} from "../../models/register/register.model";
import {User} from "../../models/User/User.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  public postUserRegister(user: Register): Observable<User[]> {
    return this.http.post<User[]>('/api/register', user);
  }
}