import {Component, Inject} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Fee} from "../payments";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-editing-additional-fees',
    templateUrl: './editing-additional-fees.component.html',
    styleUrls: ['./editing-additional-fees.component.scss']
})
export class EditingAdditionalFeesComponent {
    displayedColumns: string[] = ['name', 'type', 'value', 'edit'];

    dataSource: MatTableDataSource<Fee[]>;

    isShowAddPayment = false
    isShowEditPayment = false

    currentFee: Fee | undefined

    constructor(
        public dialogRef: MatDialogRef<EditingAdditionalFeesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { payments: Fee[] }) {
        // @ts-ignore
        this.dataSource = new MatTableDataSource(this.data.payments);
    }

    showAddPayment() {
        this.isShowAddPayment = true;
    }

    editPayment(fee: Fee) {
        this.isShowEditPayment = true;
        this.currentFee = fee
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
