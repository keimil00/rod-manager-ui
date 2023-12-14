import {Component, Inject, ViewChild} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlotWithLeaseholder} from "../garden-plot";
import {Payment, PaymentType, UserPayment, UserPaymentUpload} from "./PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";
import {PaymentsService} from "../../payments/payments.service";
import {ToastrService} from "ngx-toastr";
import {
  GardenPlotDetailsPaymentHistoryComponent
} from "./garden-plot-details-payment-history/garden-plot-details-payment-history.component";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent {
  @ViewChild('app-garden-plot-details-payment-history')
  history: GardenPlotDetailsPaymentHistoryComponent | undefined;
  gardenPlot: GardenPlotWithLeaseholder
  leaseholder: Profile;
  exleaseholder: Profile | undefined;

  showPaymentHistory = false;
  showNewPaymentForm = false;
  showEditGardenPlotForm = false;

  // @ts-ignore
  paymentHistory: UserPayment[];

  paymentForm: FormGroup;

  errorMessages = {
    amount: [
      {type: 'required', message: 'Proszę podać kwote'}
    ],
    description: [
      {type: 'required', message: 'Proszę podać kwote'}
    ],
    date: [
      {type: 'required', message: 'Proszę podać poprawną date'},
      {type: 'notFuture', message: 'Nie można podać daty z przyszłości'},
    ]
  };
  yourEnumOptions = [
    {value: PaymentType.BillPayment, label: 'Wpłata użytkownika'},
    {value: PaymentType.Correction, label: 'Korekta'},
    {value: PaymentType.Individual, label: 'Opłata indywidualna'},
    // Add more options as per your enum
  ];

  constructor(
    formBuilder: FormBuilder,
    private gardenPlotsDataService: BackendGardenService,
    private paymentsService: PaymentsService,
    public dialogRef: MatDialogRef<GardenPlotDetailsComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      gardenPlot: GardenPlotWithLeaseholder;
      leaseholder: Profile;
      exLeaseHolder: Profile
    }
  ) {
    this.gardenPlot = data.gardenPlot;
    this.leaseholder = data.leaseholder;
    this.exleaseholder = data.exLeaseHolder;
    // this.initData();
    this.paymentForm = formBuilder.group({
      amount: ['', [
        Validators.required
      ]],
      type: ['', [
        Validators.required
      ]],
      date: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
    });
  }

  closeEditingingGardenPlot() {
    this.dialogRef.close();
  }

  // initData() {
  //     this.paymentsService.getConfirmPayments(this.leaseholder?.id).subscribe({
  //         next: (payments: UserPayment[]) => {
  //             this.paymentHistory = payments;
  //         }, error: err => {
  //             this.toastr.error("Ups, nie udało się załadować płatności", 'Błąd');
  //         }
  //     });
  // }

  updatePaymentHistory() {
    this.history?.refresh();
  }

  getUserPaymentList(): UserPayment[] {
    return this.paymentHistory
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  addNewPayment() {
    if(this.paymentForm.get('amount')?.value < 0 && this.paymentForm.get('type')?.value !== PaymentType.Correction) {
      this.toastr.error('Kwota może być ujemna jedynie dla korekt', 'Błąd walidacji');
      return;
    }
    if (this.paymentForm.valid) {
      const payment: UserPaymentUpload = {
        user: this.leaseholder?.id,
        type: this.paymentForm.get('type')?.value,
        date: this.formatDateToYYYYMMDD(this.paymentForm.get('date')?.value),
        amount: this.paymentForm.get('amount')?.value,
        description: this.paymentForm.get('description')?.value
      }

      this.paymentsService.confirmPayment(payment).subscribe(
        (response) => {
          this.updatePaymentHistory()
          this.showNewPaymentForm = false;
        },
        (error) => {
          this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
        }
      );
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
}
