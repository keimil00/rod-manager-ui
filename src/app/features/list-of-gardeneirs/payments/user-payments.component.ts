import {Component, Inject, ViewChild} from '@angular/core';
import {
  Payment,
  PaymentType,
  UserPayment,
  UserPaymentUpload
} from "../../list-of-garden-plot/garden-plot-details/PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../../payments/payments.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {
  GardenPlotDetailsPaymentHistoryComponent
} from "../../list-of-garden-plot/garden-plot-details/garden-plot-details-payment-history/garden-plot-details-payment-history.component";

@Component({
  selector: 'app-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent {
  profileID: number;
  @ViewChild('app-garden-plot-details-payment-history')
  history: GardenPlotDetailsPaymentHistoryComponent | undefined;

  showPaymentHistory = true;
  showNewPaymentForm = false;

  // @ts-ignore
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

  minDate: Date = new Date();


  spinerMassage = "Ładowanie Płatności"

  constructor(
    private formBuilder: FormBuilder,
    private paymentsService: PaymentsService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UserPaymentsComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      profileID: number;
    }
  ) {
    // this.spinner.show()
    this.profileID = data.profileID;
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

  closeEditingPayments() {
    this.dialogRef.close();
  }

  updatePaymentHistory() {
    this.history?.refresh();
    this.showPaymentHistory = true;
    this.showNewPaymentForm = false;
  }

  addNewPayment() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.get('date')?.value);
      const payment: UserPaymentUpload = {
        user: this.profileID,
        type: this.paymentForm.get('type')?.value,
        date: this.formatDateToYYYYMMDD(this.paymentForm.get('date')?.value),
        amount: this.paymentForm.get('amount')?.value,
        description: this.paymentForm.get('description')?.value
      }

      this.paymentsService.confirmPayment(payment).subscribe(
          (response) => {
            this.updatePaymentHistory()
          },
          (error) => {
            this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
          }
      );
    }
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
