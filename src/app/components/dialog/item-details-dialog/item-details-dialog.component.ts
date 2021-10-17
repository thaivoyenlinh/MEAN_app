import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../../interfaces/item/item';

@Component({
	selector: 'app-item-details-dialog',
	templateUrl: './item-details-dialog.component.html',
	styleUrls: ['./item-details-dialog.component.scss']
})
export class ItemDetailsDialogComponent implements OnInit {

	itemDetails: Item;
	constructor(public dialogRef: MatDialogRef<ItemDetailsDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: Item) { }

	ngOnInit() {
		this.itemDetails = this.data;
		// console.log(this.itemDetails);
	}

	closeDialog(){
		this.dialogRef.close(false);
	}

}
