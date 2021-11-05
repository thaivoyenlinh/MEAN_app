import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  name: string;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) private data: string){ }

  ngOnInit() {
    this.name = this.data;
  }

  closeDialog(){
	  this.dialogRef.close(false);
  }

}
