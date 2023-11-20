import {Component, Inject} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlotBackend} from "../garden-plot";
import {Payment} from "./PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent {
  gardenPlot: GardenPlotBackend | undefined;
  leaseholder: Profile | undefined;

  showPaymentHistory = false;
  showNewPaymentForm = false;
  showEditGardenPlotForm = false;

  paymentForm: FormGroup;

  errorMessages = {
    value: [
      {type: 'required', message: 'Proszę podać kwote'},
      {type: 'min', message: 'Kwota musi być większa od zera'},
      {type: 'pattern', message: 'Podaj odpowiednią kwote'}
    ],
    date: [
      {type: 'required', message: 'Proszę podać poprawną date'}
    ]
  };

  constructor(formBuilder: FormBuilder, private gardenPlotsDataService: BackendGardenService,
              public dialogRef: MatDialogRef<GardenPlotDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { gardenPlot: GardenPlotBackend; leaseholder: Profile }
  ) {
    this.gardenPlot = data.gardenPlot;
    this.leaseholder = data.leaseholder;
    this.paymentForm = formBuilder.group({
      value: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?/),
        Validators.min(0.01)
      ]],
      date: ['', [
        Validators.required,
      ]]
    });
  }

  closeEditingingGardenPlot() {
    this.dialogRef.close();
  }

  getUserPaymentList(): Payment[] {
    //TODO backend API
    // this.gardenPlotsDataService.getPayments(this.leaseholder?.id)
    return this.gardenPlotsDataService.getPayments(this.leaseholder?.profileId);
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

        //TODO push do backendu dodac do listy i obnizyc kwote do zaplaty
        // this.addPaymentBackend(this.leaseholder?.id, newPayment)

        //TODO do usuniecia jak bedzie backend
        this.getUserPaymentList().push(newPayment);
        this.showNewPaymentForm = false;
        this.paymentForm.reset();
      }
    }
  }

  addPaymentBackend(leaseholderID: string | undefined, payment: Payment) {
    this.gardenPlotsDataService.confirmPayment(leaseholderID, payment).subscribe(
      (response) => {
        console.log('Payment added successfully:', response);
      },
      (error) => {
        console.error('Error while adding payment:', error);
      }
    );
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
}
