import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../home.component';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent {
  constructor(
    public dialogRef: MatDialogRef<AddModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClose(): void {
    this.dialogRef.close();
  }
}
