import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {PaymentsService} from "../payments.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Period} from "../payments.model";

@Component({
  selector: 'app-period-dialog',
  templateUrl: './period-dialog.component.html',
  styleUrls: ['./period-dialog.component.scss']
})
export class PeriodDialogComponent {
  startDate = new FormControl({value: null, disabled: true}, [Validators.required]);
  endDate = new FormControl(null, [Validators.required]);

  constructor(private paymentsService: PaymentsService,
              public dialogRef: MatDialogRef<PeriodDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Period) {
    if (this.data) {
      // @ts-ignore
      this.startDate.setValue(new Date(this.data.end_date));
      const end_date = new Date(this.data.end_date);
      end_date.setFullYear(new Date(this.data.end_date).getFullYear() + 1);
      // @ts-ignore
      this.endDate.setValue(end_date);
    } else {
      this.startDate.enable();
    }
  }

  saveNewPeriod() {
    if (this.startDate.value && this.endDate.value) {
      this.paymentsService.createBillingPeriod(this.startDate.value, this.endDate.value).subscribe(
        {
          next: value => {
            this.dialogRef.close();
          }
        }
      );
    }
  }
}
