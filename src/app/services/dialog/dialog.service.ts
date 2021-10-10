import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from 'src/app/components/dialog/delete-confirmation/delete-confirmation.component';

@Injectable({
  	providedIn: 'root'
})
export class DialogService {

	constructor(private dialog: MatDialog) {}

	openConfirmDialog(){
		return this.dialog.open(DeleteConfirmationComponent, {
			width: '350px',
			height: '200px',
			panelClass: 'confirm-dialog-container', 
			disableClose: true,
		});
	}
}
