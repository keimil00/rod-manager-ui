import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Counter, CounterType} from "../counter";

@Component({
  selector: 'app-measurement-dialog',
  templateUrl: './measurement-dialog.component.html',
  styleUrls: ['./measurement-dialog.component.scss']
})
export class MeasurementDialogComponent {
  addCounterForm: FormGroup;
  showEmptyError: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { measurement: number }
  ) {
    this.addCounterForm = formBuilder.group({
      measurement: [0, [Validators.required, Validators.min(0)]],
    });
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.addCounterForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  errorMessages = {
    measurement: [
      {type: 'required', message: 'Prosze podać poprawny pomiar'},
    ],
  };

  processDataAndClose() {
    if (this.addCounterForm.valid) {
      const newMeasurement: number = this.addCounterForm.get('measurement')?.value;

      const measurement: number = newMeasurement

      this.showEmptyError = false
      this.addCounterForm.reset();
      this.dialogRef.close(measurement)
    } else {
      this.showEmptyError = true;
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
