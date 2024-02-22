import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  openSnackBar(
    message: string,
    action?: string,

    horizontalPosition?: string
  ) {
    const config: MatSnackBarConfig = {};
    config.horizontalPosition =
      (horizontalPosition as MatSnackBarHorizontalPosition) ??
      config.horizontalPosition;

    this.snackBar.open(message, action, config);
  }

  constructor(private snackBar: MatSnackBar) {}
}
