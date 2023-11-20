import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Fee, TypeOfFee} from "../../payments";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../../payments.service";

@Component({
    selector: 'app-editing-single-additional-fee',
    templateUrl: './editing-single-additional-fee.component.html',
    styleUrls: ['./editing-single-additional-fee.component.scss']
})
export class EditingSingleAdditionalFeeComponent {
    @Input() payment: Fee | undefined;
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

    ngOnInit() {
        this.populateFormFromGardenPlot()
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

    private populateFormFromGardenPlot() {
        this.editFeeForm.patchValue({
            name: this.payment?.name,
            type: this.payment?.type,
            value: this.payment?.value
        });
    }

    editPayment() {
        if (this.editFeeForm.valid) {
            const newName: string = this.editFeeForm.get('name')?.value;
            const newType: TypeOfFee = this.editFeeForm.get('type')?.value;
            const newValue: number = this.editFeeForm.get('value')?.value;

            let payment: Fee | undefined = this.payment

            this.payment = payment

            // @ts-ignore
            payment.name = newName;
            // @ts-ignore
            payment.type = newType;
            // @ts-ignore
            payment.value = newValue;

            this.paymentsService.editAdditionalFee(payment)

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
