import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from 'src/app/components/dialog/delete-confirmation/delete-confirmation.component';
import { ItemDetailsDialogComponent } from 'src/app/components/dialog/item-details-dialog/item-details-dialog.component';
import { ConfirmOrderComponent } from 'src/app/components/dialog/confirm-order/confirm-order.component';

@Injectable({
  	providedIn: 'root'
})
export class DialogService {

	constructor(private dialog: MatDialog) {}

	openConfirmDialog(name){
		return this.dialog.open(DeleteConfirmationComponent, {
			width: '350px',
			height: '200px',
			data: name,
			// panelClass: 'confirm-dialog-container', 
			disableClose: true,
		});
	}

	openItemDetailsDialog(row){
		// console.log("THIS IS SERVICE DIALOG: ",row);
		return this.dialog.open(ItemDetailsDialogComponent, {
			width: '900px',
			height: '450px',
			data: row,
			// panelClass: 'custom-dialog-container', 
			disableClose: true,
		});
	}

	openConfirmOrderDialog(orderData){
		return this.dialog.open(ConfirmOrderComponent, {
			width: '650px',
			height: '450px',
			data: orderData,
			disableClose: true,
			// panelClass: 'custom-dialog-container', 
		})
	}
}
