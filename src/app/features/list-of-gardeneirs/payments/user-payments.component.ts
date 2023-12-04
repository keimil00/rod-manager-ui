import {Component, Inject} from '@angular/core';
import {Payment} from "../../list-of-garden-plot/garden-plot-details/PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../../payments/payments.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent {
  profileID: number | undefined;

  showPaymentHistory = false;
  showNewPaymentForm = false;

  // @ts-ignore
  paymentHistory: Payment[];
  // @ts-ignore
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

  spinerMassage = "Ładowanie Płatności"

  constructor(private formBuilder: FormBuilder, private paymentsService: PaymentsService,private spinner: NgxSpinnerService,
              public dialogRef: MatDialogRef<UserPaymentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                profileID: number;
              }
  ) {
    this.spinner.show()
    this.profileID = data.profileID;
  }

  closeEditingPayments() {
    this.dialogRef.close();
  }

  ngOnInit(): void{
    this.initData()
  }
  initData() {
    this.paymentsService.getConfirmPayments(this.profileID).subscribe((payments: Payment[]) => {
      this.paymentHistory = payments;
      this.generateForm()
      if(this.paymentHistory.length>0){this.spinner.hide(); this.showPaymentHistory=true}
    });
  }

  generateForm(){
    this.paymentForm = this.formBuilder.group({
      value: [0, [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d{1,2})?$/)
      ]],
      date: ['', [Validators.required, this.pastDateValidator()]],
    });
  }

  updatePaymentHistory() {
    this.paymentsService.getConfirmPayments(this.profileID).subscribe((payments: Payment[]) => {
      this.paymentHistory = payments;
      this.paymentForm.reset();
      this.spinner.hide()
      this.showNewPaymentForm = false;
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

        this.spinerMassage="Aktualizowanie stanu zadłużenia"
        this.spinner.show()
        this.paymentsService.confirmPayment(this.profileID, newPayment).subscribe(
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
