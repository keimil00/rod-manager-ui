import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-measurement-dialog',
  templateUrl: './measurement-dialog.component.html',
  styleUrls: ['./measurement-dialog.component.scss']
})
export class MeasurementDialogComponent implements OnInit {
  addCounterForm: FormGroup;
  showEmptyError: boolean = false;
  measurement: number;

  constructor(
    formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { measurement: number }
  ) {
    this.addCounterForm = formBuilder.group({
      measurement: [0, [Validators.required, Validators.min(data.measurement)]],
    });
    this.measurement = data.measurement
  }

  ngOnInit(): void {
    this.populateForm()
  }

  populateForm() {
    this.addCounterForm.patchValue({
      // @ts-ignore
      measurement: this.measurement,
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
      {type: 'min', message: 'Prosze podać większy pomiar od poprzedniego'},
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
