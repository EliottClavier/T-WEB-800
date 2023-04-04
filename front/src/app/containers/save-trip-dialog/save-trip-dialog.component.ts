import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-save-trip-dialog',
  templateUrl: './save-trip-dialog.component.html',
  styleUrls: ['./save-trip-dialog.component.scss']
})
export class SaveTripDialogComponent {



  constructor(
    public dialogRef: MatDialogRef<SaveTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: string){
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOKClick(): void {
    this.dialogRef.close(this.dataDialog);

  }
}
