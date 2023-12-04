import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-description-dialog',
  templateUrl: './edit-description-dialog.component.html',
  styleUrls: ['./edit-description-dialog.component.scss']
})
export class EditDescriptionDialogComponent {
  currentDescription: string;
  constructor(
    private dialogRef: MatDialogRef<EditDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.currentDescription = this.data.description;
  }

  saveDescription(): void {
    this.dialogRef.close(this.currentDescription);
  }
}
