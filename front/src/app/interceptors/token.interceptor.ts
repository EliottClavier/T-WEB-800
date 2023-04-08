import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (request.url.includes('/api/trips') || request.url.includes('/api/trips')) {
      // Only apply the TokenInterceptor to requests that include '/api/secure'
      return this._authService.checkTokenValidity().pipe(
        switchMap(() => {
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              WWW_Authenticate: `Basic`
            }
          });
          return next.handle(authReq);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // Redirect to login page if token is not valid
            this._router.navigate(['/']);
          }
          return throwError(() => err);
        })
      );
    }

    return next.handle(request);
  }
}
