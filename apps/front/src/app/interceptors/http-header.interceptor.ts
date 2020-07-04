import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return next.handle(req);
    }
    const newReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json; charset=utf-8'),
    });
    return next.handle(newReq);
  }
}
