import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = localStorage.getItem('yoog_language');

    if (language) {
      const modifiedReq = req.clone({
        headers: req.headers.set('x-language', language)
      });

     return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
