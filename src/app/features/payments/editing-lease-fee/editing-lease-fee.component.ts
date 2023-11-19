import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../payments.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Fee, TypeOfFee} from "../payments";
import {IndividualPaymentsComponent} from "../individual-payments/individual-payments.component";
import {GardenPlotBackend} from "../../list-of-garden-plot/garden-plot";
import {findProfileEmailByID} from "../../list-of-garden-plot/GardenService";
import {profiles} from "../../list-of-users/ProfilesService";

@Component({
    selector: 'app-editing-lease-fee',
    templateUrl: './editing-lease-fee.component.html',
    styleUrls: ['./editing-lease-fee.component.scss']
})
export class EditingLeaseFeeComponent {
    editLeaseFeesForm: FormGroup;
    leaseFees: Fee[]

    constructor(formBuilder: FormBuilder, private paymentsService: PaymentsService,
                public dialogRef: MatDialogRef<IndividualPaymentsComponent>,
                @Inject(MAT_DIALOG_DATA) private data: { leaseFees: Fee[]; }
    ) {
        this.leaseFees = this.data.leaseFees
        this.editLeaseFeesForm = formBuilder.group({
            PZDtype: ['', [
                Validators.required,
            ]],
            PZDvalue: [0, [
                Validators.required, Validators.min(0.01)
            ]],
            gardenFeeType: ['', [
                Validators.required,
            ]],
            gardenFeeValue: [0, [
                Validators.required, Validators.min(0.01)
            ]],
            investmentFeeType: ['', [
                Validators.required,
            ]],
            investmentFeeValue: [0, [
                Validators.required, Validators.min(0.01)
            ]],
        });
        this.populateFormFromGardenPlot()
    }

    private errorMessages = {
        PZDtype: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        PZDvalue: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ],
        gardenFeeType: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        gardenFeeValue: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ],
        investmentFeeType: [
            {type: 'required', message: 'Proszę podać typ'},
        ],
        investmentFeeValue: [
            {type: 'required', message: 'Proszę podać wartość'},
            {type: 'min', message: 'Kwota musi być większa od zera'},
        ],
    };

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.editLeaseFeesForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    private populateFormFromGardenPlot() {
        this.editLeaseFeesForm.patchValue({
            PZDtype: this.leaseFees[0].type,
            PZDvalue: this.leaseFees[0].value,
            gardenFeeType: this.leaseFees[1].type,
            gardenFeeValue: this.leaseFees[1].value,
            investmentFeeType: this.leaseFees[2].type,
            investmentFeeValue: this.leaseFees[2].value,
        });
    }

    editPayments() {
        if (this.editLeaseFeesForm.valid) {
            const PZDtype: TypeOfFee = this.editLeaseFeesForm.get('PZDtype')?.value;
            const PZDvalue: number = this.editLeaseFeesForm.get('PZDvalue')?.value;
            const gardenFeeType: TypeOfFee = this.editLeaseFeesForm.get('gardenFeeType')?.value;
            const gardenFeeValue: number = this.editLeaseFeesForm.get('gardenFeeValue')?.value;
            const investmentFeeType: TypeOfFee = this.editLeaseFeesForm.get('investmentFeeType')?.value;
            const investmentFeeValue: number = this.editLeaseFeesForm.get('investmentFeeValue')?.value;

            let payments = this.leaseFees

            payments[0].type = PZDtype;
            payments[0].value = PZDvalue;
            payments[1].type = gardenFeeType;
            payments[1].value = gardenFeeValue;
            payments[2].type = investmentFeeType;
            payments[2].value = investmentFeeValue;

            this.leaseFees = payments
            this.paymentsService.editLeaseFee(payments)
            this.editLeaseFeesForm.reset()
            this.closeDialog()
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    protected readonly Object = Object;
    protected readonly TypeOfFee = TypeOfFee;
}
