import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.checkTokenValidity().pipe(
      tap(
        (isValid) => {
        if (isValid === "No token found" || isValid === "Token is not valid") {
          this._router.navigate(['/']);
        }
      }),
      catchError(
        (err: any) => {
          this._router.navigate(['/']);
          return throwError(() => err);
      })
    );
  }
}
