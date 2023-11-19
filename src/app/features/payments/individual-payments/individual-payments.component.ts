import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {IndividualPayment, IndividualPayments} from "../payments";
import {PaymentsService} from "../payments.service";

@Component({
    selector: 'app-individual-payments',
    templateUrl: './individual-payments.component.html',
    styleUrls: ['./individual-payments.component.scss']
})
export class IndividualPaymentsComponent {
    displayedColumns: string[] = ['name', 'value', 'delete'];

    dataSource: MatTableDataSource<IndividualPayment>;
    address: string;

    isShowAddPayment = false

    userID: string

    constructor(private paymentsService: PaymentsService,
                public dialogRef: MatDialogRef<IndividualPaymentsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { payments: IndividualPayments, address: string }) {
        // @ts-ignore
        this.userID = this.data.payments.userID
        this.dataSource = new MatTableDataSource(this.data.payments.paymentsList);
        this.address = this.data.address
    }

    showAddPayment() {
        this.isShowAddPayment = true;
    }

    delete(fee: IndividualPayment) {
        this.paymentsService.deleteIndividualPayment(this.userID, fee.paymentID)
        this.dataSource._updateChangeSubscription();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
