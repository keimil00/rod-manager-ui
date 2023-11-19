import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-edit-date',
    templateUrl: './edit-date.component.html',
    styleUrls: ['./edit-date.component.scss']
})
export class EditDateComponent {
    selectedDate: Date;

    constructor(
        public dialogRef: MatDialogRef<EditDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedDate = this.data.currentDate;
    }

    onConfirm(): void {
        this.dialogRef.close(this.selectedDate);
    }
}
