import {Component, Inject} from '@angular/core';
import {Fee, TypeOfFee} from "../payments";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../payments.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IndividualPaymentsComponent} from "../individual-payments/individual-payments.component";

@Component({
    selector: 'app-editing-utility-fee',
    templateUrl: './editing-utility-fee.component.html',
    styleUrls: ['./editing-utility-fee.component.scss']
})
export class EditingUtilityFeeComponent {

    editUtilityFeesForm: FormGroup;
    utilityFees: Fee[]

    constructor(formBuilder: FormBuilder, private paymentsService: PaymentsService,
                public dialogRef: MatDialogRef<IndividualPaymentsComponent>,
                @Inject(MAT_DIALOG_DATA) private data: { utilityFees: Fee[]; }
    ) {
        this.utilityFees = this.data.utilityFees
        this.editUtilityFeesForm = formBuilder.group({
            electricCurrentType: ['', [
                Validators.required,
            ]],
            electricCurrentValue: [0, [
                Validators.required, Validators.min(0.01)
            ]],
            waterType: ['', [
                Validators.required,
            ]],
            waterValue: [0, [
                Validators.required, Validators.min(0.01)
            ]],
        });
        this.populateFormFromGardenPlot()
    }

    private errorMessages = {
        electricCurrentType: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        electricCurrentValue: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ],
        waterType: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        waterValue: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ],
    };

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.editUtilityFeesForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    private populateFormFromGardenPlot() {
        this.editUtilityFeesForm.patchValue({
            electricCurrentType: this.utilityFees[0].type,
            electricCurrentValue: this.utilityFees[0].value,
            waterType: this.utilityFees[1].type,
            waterValue: this.utilityFees[1].value,
        });
    }

    editPayments() {
        if (this.editUtilityFeesForm.valid) {
            const electricCurrentType: TypeOfFee = this.editUtilityFeesForm.get('electricCurrentType')?.value;
            const electricCurrentValue: number = this.editUtilityFeesForm.get('electricCurrentValue')?.value;
            const waterType: TypeOfFee = this.editUtilityFeesForm.get('waterType')?.value;
            const waterValue: number = this.editUtilityFeesForm.get('waterValue')?.value;

            let payments = this.utilityFees

            payments[0].type = electricCurrentType;
            payments[0].value = electricCurrentValue;
            payments[1].type = waterType;
            payments[1].value = waterValue;

            this.utilityFees = payments
            this.paymentsService.editUtilityFee(payments)
            this.editUtilityFeesForm.reset()
            this.closeDialog()
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    protected readonly TypeOfFee = TypeOfFee;
    protected readonly Object = Object;
}
