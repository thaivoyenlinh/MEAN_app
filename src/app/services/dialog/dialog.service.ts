import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComfirmationDialogComponent } from 'src/app/components/comfirmation-dialog/comfirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openConfirmDialog(){
    this.dialog.open(ComfirmationDialogComponent, {
      width: '350px',
      panelClass: 'confirm-dialog-container', 
      // disableClose: true,
    });
  }
}
