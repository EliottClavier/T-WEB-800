import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Register} from "../../models/register/register.model";
import {Observable} from "rxjs";
import {Credentials} from "../../models/credentials/credentials.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public postLogin(credentials: Credentials): Observable<Object> {
    return this.http.post<Object>('/api/auth/login', credentials);
  }
}
