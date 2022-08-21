import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('connectedUser');
    if (token) {
      const parsedToken = JSON.parse(token);
      req = req.clone({
        setHeaders: {
          'Authorization': 'Basic ' + btoa(parsedToken.username+':'+parsedToken.password)
        }
      });
    }
    return next.handle(req);
  }
}