import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {UserModel} from "../../models/users/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: UserModel | undefined;

  constructor(private http: HttpClient) { }

  public checkTokenValidity(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Token does not exist in localStorage, return an error Observable
      return new BehaviorSubject('No token found');
    }

    // Token exists, check its validity
    return this.http.get('/api/auth/valid-token').pipe(
      tap(() => {
        // Token is valid, retrieve UserModel object
        this._getUserByToken(token).subscribe(
          (user: UserModel) => {
            this.user = user;
          }
        );
      }),
      catchError((err: any) => {
        // Token is not valid, remove it from localStorage
        localStorage.removeItem('token');
        return new BehaviorSubject('Token is not valid');
      }),
    );
  }

  private _getUserByToken(token: string): Observable<UserModel> {
    return this.http.get<UserModel>(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        WWW_Authenticate: `Basic`
      }
    });
  }

  get user(): UserModel | undefined {
    return this._user;
  }

  set user(value: UserModel | undefined) {
    this._user = value;
  }
}
