import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';
@Injectable()
export class tokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    debugger

    if (isPlatformBrowser(this.platformId)) {
      console.log("inside interceptor")
      debugger
      const token = localStorage.getItem('token');
      console.log('TokenInterceptor - token:', token);

      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }

      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            if (this.router.url !== '/') {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
          return throwError(() => error);
        })
      );
    } else {
      const error = new Error('localStorage is not available');
      return throwError(() => error);
    }
  }
}