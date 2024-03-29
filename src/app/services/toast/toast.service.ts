import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../../components/snackbar/toast-message/toast-message.component';

@Injectable({
  	providedIn: 'root'
})
export class ToastService {

	constructor(private snackBar: MatSnackBar) { }

	showSuccessMessage(message){
		this.snackBar.openFromComponent(ToastMessageComponent, {
			data: message,
			duration: 2000,
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
			panelClass: 'success'
		});
	}

	showErrorMessage(message){
		this.snackBar.openFromComponent(ToastMessageComponent, {
			data: message,
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
			panelClass: 'error'
		});
	}
}
