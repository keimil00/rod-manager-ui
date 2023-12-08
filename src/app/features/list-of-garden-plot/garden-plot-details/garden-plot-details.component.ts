import {Component, Inject} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlotWithLeaseholder} from "../garden-plot";
import {Payment} from "./PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";
import {PaymentsService} from "../../payments/payments.service";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent {
  gardenPlot: GardenPlotWithLeaseholder
  leaseholder: Profile | undefined;
  exleaseholder: Profile | undefined;

  showPaymentHistory = false;
  showNewPaymentForm = false;
  showEditGardenPlotForm = false;

  // @ts-ignore
  paymentHistory: Payment[];


  paymentForm: FormGroup;

  errorMessages = {
    value: [
      {type: 'required', message: 'Proszę podać kwote'},
      {type: 'pattern', message: 'Podaj odpowiednią kwote'}
    ],
    date: [
      {type: 'required', message: 'Proszę podać poprawną date'},
      {type: 'notFuture', message: 'Nie można podać daty z przyszłości'},
    ]
  };

  constructor(formBuilder: FormBuilder, private gardenPlotsDataService: BackendGardenService, private paymentsService: PaymentsService,
              public dialogRef: MatDialogRef<GardenPlotDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                gardenPlot: GardenPlotWithLeaseholder;
                leaseholder: Profile;
                exLeaseHolder: Profile
              }
  ) {
    this.gardenPlot = data.gardenPlot;
    this.leaseholder = data.leaseholder;
    this.exleaseholder = data.exLeaseHolder;
    this.initData();
    this.paymentForm = formBuilder.group({
      value: ['', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d{1,2})?$/)
      ]],
      date: ['', [Validators.required, this.pastDateValidator()]],
    });
  }

  closeEditingingGardenPlot() {
    this.dialogRef.close();
  }

  initData() {
    this.paymentsService.getConfirmPayments(this.leaseholder?.id).subscribe((payments: Payment[]) => {
      this.paymentHistory = payments;
    });
  }

  updatePaymentHistory() {
    this.paymentsService.getConfirmPayments(this.leaseholder?.id).subscribe((payments: Payment[]) => {
      this.paymentHistory = payments;
      this.showNewPaymentForm = false;
      this.paymentForm.reset();
    });
  }

  getUserPaymentList(): Payment[] {
    return this.paymentHistory
  }

  addNewPayment() {
    if (this.paymentForm.valid) {
      const newPaymentAmount: number = this.paymentForm.get('value')?.value;
      const newPaymentDate: Date = this.paymentForm.get('date')?.value;

      if (newPaymentAmount !== null && newPaymentDate !== null) {
        const newPayment: Payment = {
          value: newPaymentAmount,
          date: newPaymentDate,
        };

        // this.addPaymentBackend(this.leaseholder?.id, newPayment)

        this.paymentsService.confirmPayment(this.leaseholder?.id, newPayment).subscribe(
          (response) => {
            console.log('Payment added successfully:', response);
            this.updatePaymentHistory()
          },
          (error) => {
            console.error('Error while adding payment:', error);
          }
        );

      }
    }
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.paymentForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }
  pastDateValidator() {
    return (control: { value: Date }) => {
      const currentDate = new Date();
      const inputDate = control.value;
      return inputDate <= currentDate ? null : {notFuture: true};
    };
  }
}
