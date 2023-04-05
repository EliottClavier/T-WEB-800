import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {UserModel} from "../../models/users/user.model";
import jwt_decode from 'jwt-decode';

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
    return this.http.get(`/api/auth/valid-token?token=${token}`).pipe(
      tap(() => {
        // Token is valid, retrieve UserModel object
        this.getUserByToken(token).subscribe(
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

  public getUserByToken(token: string): Observable<UserModel> {
    let tokenInfos: any = this._decodeTokenInfos(token);
    return this.http.get<UserModel>(`/api/users/by-email/${tokenInfos.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        WWW_Authenticate: `Basic`
      }
    });
  }

  private _decodeTokenInfos(token: string): Object | null {
    try {
      let jwt: any = jwt_decode(token);
      return JSON.parse(jwt.sub);
    } catch (err) {
      return null;
    }
  }

  public disconnect(): void {
    localStorage.removeItem('token');
    this.user = undefined;
  }

  get user(): UserModel | undefined {
    return this._user;
  }

  set user(value: UserModel | undefined) {
    this._user = value;
  }
}
