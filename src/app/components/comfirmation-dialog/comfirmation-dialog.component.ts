import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-comfirmation-dialog',
	templateUrl: './comfirmation-dialog.component.html',
	styleUrls: ['./comfirmation-dialog.component.scss']
})
export class ComfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComfirmationDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
	  this.dialogRef.close(false);
  }

}
