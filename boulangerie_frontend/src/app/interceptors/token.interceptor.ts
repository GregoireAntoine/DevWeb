import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      const parsedToken = JSON.parse(token);
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${parsedToken.refresh}`
        }
      });
    }
    return next.handle(req);
  }
}
