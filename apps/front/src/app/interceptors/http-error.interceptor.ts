import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageEnum } from '../enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((resp: HttpErrorResponse) => {
        switch (resp.status) {
          case 401:
            localStorage.removeItem('accessToken');
            this.router.navigateByUrl(PageEnum.LOGIN.getUri());
            break;
        }
        return throwError(resp);
      })
    );
  }
}
