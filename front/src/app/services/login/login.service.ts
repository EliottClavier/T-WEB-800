import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CredentialsModel} from "../../models/credentials/credentials.model";
import {UserModel} from "../../models/users/user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public postLogin(credentials: CredentialsModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/login', credentials);
  }
}
