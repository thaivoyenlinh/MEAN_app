import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { bufferToggle } from 'rxjs/operators';
import { ComfirmationDialogComponent } from 'src/app/components/comfirmation-dialog/comfirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openConfirmDialog(){
      return this.dialog.open(ComfirmationDialogComponent, {
      width: '350px',
      height: '200px',
      panelClass: 'confirm-dialog-container', 
      disableClose: true,
    });
  }
}
