import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IndividualPayment} from "../../payments";
import {PaymentsService} from "../../payments.service";

@Component({
    selector: 'app-add-individual-payment',
    templateUrl: './add-individual-payment.component.html',
    styleUrls: ['./add-individual-payment.component.scss']
})
export class AddIndividualPaymentComponent {
    @Input() userID: number | undefined;
    @Input() address: string | undefined;
    @Output() closeDialog = new EventEmitter<void>();

    addIndividualPaymentForm: FormGroup;

    private errorMessages = {
        name: [
            {type: 'required', message: 'Proszę nazwe'},
        ],
        value: [
            {type: 'required', message: 'Proszę podać kwote'},
            {type: 'min', message: 'Kwota musi być większa od zera'}
        ],
    };

    constructor(private formBuilder: FormBuilder, private paymentsService: PaymentsService) {
        this.addIndividualPaymentForm = formBuilder.group({
            name: ['', [
                Validators.required,
            ]],
            value: ['', [
                Validators.required, Validators.min(0.01)
            ]],
        });
    }

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.addIndividualPaymentForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    addPayment() {
        if (this.addIndividualPaymentForm.valid) {
            const name: string = this.addIndividualPaymentForm.get('name')?.value;
            const value: number = this.addIndividualPaymentForm.get('value')?.value;

            const uniqueId :number = new Date().getTime() + Math.floor(Math.random() * 1000);

            const newPayment: IndividualPayment = {paymentID: uniqueId, name: name, value: value, date: new Date(Date.now())}

            this.paymentsService.addNewIndividualPayment(this.userID, newPayment).subscribe()

            this.addIndividualPaymentForm.reset();
            this.closeDialog.emit()
        }
    }
}
