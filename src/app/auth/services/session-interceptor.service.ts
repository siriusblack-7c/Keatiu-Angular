import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionToken = localStorage.getItem('yoog_session');
    const laravelToken = localStorage.getItem('influencers_session');

    let authReq = req;
    if (req.url.includes('influencers-api')) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${laravelToken}`)
      });
    } else if (sessionToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${sessionToken}`)
      });
    }

    const excludedPaths = [
      { url: '/api/user/session', method: 'POST'},
      { url: '/api/user', method: 'POST'}
    ]

    for (let i = 0; i < excludedPaths.length; i++) {
      if (req.url === excludedPaths[i].url && req.method === excludedPaths[i].method) {
        return next.handle(req);
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('yoog_session');
          localStorage.removeItem('yoog_megabytes');
          localStorage.removeItem('influencers_session');
          alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
          this.router.navigate(['/']);
        }

        return throwError(() => error);
      })
    );
  }
}
