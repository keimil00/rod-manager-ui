import {Component, Inject} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Fee} from "../payments";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentsService} from "../payments.service";

@Component({
  selector: 'app-editing-additional-fees',
  templateUrl: './editing-additional-fees.component.html',
  styleUrls: ['./editing-additional-fees.component.scss']
})
export class EditingAdditionalFeesComponent {
  displayedColumns: string[] = ['name', 'type', 'value', 'edit', 'delete'];

  payments: Fee[]
  dataSource: MatTableDataSource<Fee>;

  isShowAddPayment = false
  isShowEditPayment = false

  currentFee: Fee | undefined

  constructor(
    private paymentsService: PaymentsService,
    public dialogRef: MatDialogRef<EditingAdditionalFeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payments: Fee[] }) {
    // @ts-ignore
    this.payments = this.data.payments
    this.dataSource = new MatTableDataSource(this.payments);
  }

  showAddPayment() {
    this.isShowAddPayment = true;
  }

  editPayment(fee: Fee) {
    this.isShowEditPayment = true;
    this.currentFee = fee
  }

  updatePayment(feeID:number) {
    this.payments.forEach((fee, index) => {
      if (fee.feeID === feeID) {
        this.payments.splice(index, 1);
      }
    });
    console.log(this.payments);
    this.dataSource.data = this.payments;
    this.dataSource._updateChangeSubscription();
  }


  deletePayment(feeID: number) {
    this.updatePayment(feeID)
    this.paymentsService.deleteAdditionalFee(feeID).subscribe((res) => {
    })

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
