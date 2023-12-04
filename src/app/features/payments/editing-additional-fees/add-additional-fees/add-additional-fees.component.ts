import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Fee, TypeOfFee} from "../../payments";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../../payments.service";

@Component({
    selector: 'app-add-additional-fees',
    templateUrl: './add-additional-fees.component.html',
    styleUrls: ['./add-additional-fees.component.scss']
})
export class AddAdditionalFeesComponent {

    @Output() closeDialogOutput = new EventEmitter<void>();

    editFeeForm: FormGroup;

    constructor(formBuilder: FormBuilder, private paymentsService: PaymentsService,
    ) {

        this.editFeeForm = formBuilder.group({
            name: ['', [
                Validators.required,
            ]],
            type: ['', [
                Validators.required,
            ]],
            value: [0, [
                Validators.required, Validators.min(0.01)
            ]],
        });
    }

    private errorMessages = {
        name: [
            {type: 'required', message: 'Proszę podać nazwę'},
        ],
        type: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        value: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ]
    };

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.editFeeForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    addPayment() {
        if (this.editFeeForm.valid) {
            const newName: string = this.editFeeForm.get('name')?.value;
            const newType: TypeOfFee = this.editFeeForm.get('type')?.value;
            const newValue: number = this.editFeeForm.get('value')?.value;

            const uniqueId : number = new Date().getTime()+ Math.floor(Math.random() * 1000);

            let payment: Fee = {
                feeID: uniqueId,
                name: newName,
                type: newType,
                value: newValue
            }

            this.paymentsService.addAdditionalFee(payment).subscribe()

            this.editFeeForm.reset()
            this.closeDialog()
        }
    }

    closeDialog() {
        this.closeDialogOutput.emit()
    }

    protected readonly TypeOfFee = TypeOfFee;
    protected readonly Object = Object;
}
