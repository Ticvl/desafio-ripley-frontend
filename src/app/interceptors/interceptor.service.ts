import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers
        .append('Authorization', `${token}`)
        .append('Access-Control-Allow-Origin', '*')
    });

    return next.handle(authReq)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );

  }
}
