import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CredentialsModel} from "../../models/credentials/credentialsModel";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public postLogin(credentials: CredentialsModel): Observable<Object> {
    return this.http.post<Object>('/api/auth/login', credentials);
  }
}
