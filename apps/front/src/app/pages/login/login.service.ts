import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  LoginRequestPayload,
  LoginResponsePayload,
} from '@share/common/payload';
import { environment } from 'apps/front/src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SnackbarValues } from '../../enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  login(loginPayload: LoginRequestPayload): Observable<string> {
    return this.http
      .post<LoginResponsePayload>(
        `${environment.restfulApiUrl}/api/login`,
        loginPayload
      )
      .pipe(
        map((loginResponse: LoginResponsePayload) => {
          const { accessToken } = loginResponse;
          localStorage.setItem('accessToken', accessToken);
          this.snackBar.open('Login successful.', '', {
            panelClass: `snackbar-bg-${SnackbarValues.success}`,
            duration: 5000,
          });
          return accessToken;
        }),
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open('Login failure.', '', {
            panelClass: `snackbar-bg-${SnackbarValues.warning}`,
            duration: 5000,
          });
          return throwError(error);
        })
      );
  }
}
