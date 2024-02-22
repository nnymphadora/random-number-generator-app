import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackbarService } from '../services/mat-snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          this.snackBarService.openSnackBar(
            'Service unavailable! Please try again.',
            'OK',
            'center'
          );
        }
        return throwError(err);
      })
    );
  }

  constructor(private snackBarService: MatSnackbarService) {}
}
