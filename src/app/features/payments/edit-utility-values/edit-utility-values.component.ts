import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Fee, TypeOfFee, UtilityValues} from "../payments";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentsService} from "../payments.service";

@Component({
  selector: 'app-edit-utility-values',
  templateUrl: './edit-utility-values.component.html',
  styleUrls: ['./edit-utility-values.component.scss']
})
export class EditUtilityValuesComponent {
  currentUtilityValues: UtilityValues;

  constructor(formBuilder: FormBuilder, private paymentsService: PaymentsService,
    public dialogRef: MatDialogRef<EditUtilityValuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUtilityValues = this.data.utilityValues;
    this.editUtilityValuesForm = formBuilder.group({
      electricCurrentValue: [0, [
        Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?/), Validators.min(0.01)
      ]],
      waterValue: [0, [
        Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?/), Validators.min(0.01)
      ]],
    });
    this.populateFormFromGardenPlot()
  }


  editUtilityValuesForm: FormGroup;


  private errorMessages = {
    electricCurrentValue: [
      {type: 'required', message: 'Proszę podać wartość'},
      {type: 'pattern', message: 'Podaj odpowiednią kwote'},
      {type: 'min', message: 'Kwota musi być większa od zera'},
    ],
    waterValue: [
      {type: 'required', message: 'Proszę podać wartość'},
      {type: 'pattern', message: 'Podaj odpowiednią kwote'},
      {type: 'min', message: 'Kwota musi być większa od zera'},
    ],
  };

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.editUtilityValuesForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  private populateFormFromGardenPlot() {
    this.editUtilityValuesForm.patchValue({
      electricCurrentValue: this.currentUtilityValues.electricValue,
      waterValue: this.currentUtilityValues.waterValue,
    });
  }

  editUtilityValues() {
    if (this.editUtilityValuesForm.valid) {
      const electricCurrentValue: number = this.editUtilityValuesForm.get('electricCurrentValue')?.value;
      const waterValue: number = this.editUtilityValuesForm.get('waterValue')?.value;

      const payments: UtilityValues = {
        electricValue: electricCurrentValue,
        waterValue: waterValue,
      }

      this.paymentsService.editUtilityValues(payments).subscribe()
      this.editUtilityValuesForm.reset()
      this.closeDialog()
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly TypeOfFee = TypeOfFee;
  protected readonly Object = Object;
}
