import {Component, Inject, OnInit} from '@angular/core';
import {Counter, CounterType} from "../counter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {counters} from "../counters.component";
import {
  findGardenPlotIdByAddress,
  gardenPlots,
  getMatchingAvenues,
  getMatchingNumbers,
  getMatchingSectors
} from "../../list-of-garden-plot/GardenService";

@Component({
  selector: 'app-add-counter-dialog',
  templateUrl: './add-counter-dialog.component.html',
  styleUrls: ['./add-counter-dialog.component.scss']
})
export class AddCounterDialogComponent implements OnInit {
  isWaterType: boolean = true;
  addCounterForm: FormGroup;
  showEmptyError: boolean = false;
  showGardenAddress: boolean = false;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  numbersOptions: (number | null)[] = [];

  constructor(
    formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCounterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newCounter: Counter }
  ) {
    this.addCounterForm = formBuilder.group({
      id: ['', [Validators.required, uniqueCounterIdValidator(counters)]],
      address: [''],
      measurement: [0, [Validators.required, Validators.min(0)]],
      sector: [''],
      avenue: [''],
      number: [''],
      showGardenAddress: [false]
    });

    this.addCounterForm.get('showGardenAddress')?.valueChanges.subscribe((value: boolean) => {
      const addressControl = this.addCounterForm.get('address');
      if (value) {
        // If the checkbox is checked, the "sector", "avenue" and "number" fields become required
        this.addCounterForm.get('sector')?.setValidators([Validators.required]);
        this.addCounterForm.get('avenue')?.setValidators([Validators.required]);
        this.addCounterForm.get('number')?.setValidators([Validators.required]);
        addressControl?.clearValidators();
      } else {
        this.addCounterForm.get('sector')?.clearValidators();
        this.addCounterForm.get('avenue')?.clearValidators();
        this.addCounterForm.get('number')?.clearValidators();
        addressControl?.setValidators([Validators.required]);
      }
      this.addCounterForm.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.sectorsOptions = getMatchingSectors(counters, gardenPlots);

    this.addCounterForm.get('sector')?.valueChanges.subscribe((value) => {
      this.avenuesOptions = getMatchingAvenues(counters, gardenPlots, this.addCounterForm.get('sector')?.value)
      this.numbersOptions = []
    });

    this.addCounterForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.numbersOptions = getMatchingNumbers(counters, gardenPlots, this.addCounterForm.get('sector')?.value, this.addCounterForm.get('avenue')?.value)
    });
  }


  changeType() {
    this.isWaterType = !this.isWaterType
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
    id: [
      {type: 'required', message: 'Proszę podać id licznika'},
      {type: 'uniqueCounterId', message: 'Wybrane ID jest juz zajęte'},
    ],
    sector: [
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    avenue: [
      {type: 'required', message: 'Proszę podać poprawną aleje'}
    ],
    number: [
      {type: 'required', message: 'Proszę podać poprawny numer'}
    ],
    address: [
      {type: 'required', message: 'Proszę podać adres'},
    ],
    measurement: [
      {type: 'required', message: 'Prosze podać pomiar'},
    ],
  };

  processDataAndClose() {
    if (this.addCounterForm.valid) {
      const newID: string = this.addCounterForm.get('id')?.value;
      const newAddress: string | null = this.addCounterForm.get('address')?.value;
      const newMeasurement: number = this.addCounterForm.get('measurement')?.value;
      const newSector: string | null = this.addCounterForm.get('sector')?.value;
      const newAvenue: string | null = this.addCounterForm.get('avenue')?.value;
      const newNumber: number | null = this.addCounterForm.get('number')?.value;

      // const uniqueId = 'counter-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);

      let gardenPlotID: string | null = null;
      let finalAddress: string | null;

      if (this.showGardenAddress) {
        finalAddress = newSector + ', ' + newAvenue + ', ' + newNumber;
        gardenPlotID = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, gardenPlots)
      } else {
        finalAddress = newAddress;
      }
      const counter: Counter = {
        id: newID,
        measurement: newMeasurement,
        type: this.isWaterType ? CounterType.Water : CounterType.Electric,
        gardenPlotID: gardenPlotID,
        addressC: finalAddress
      };

      this.showEmptyError = false
      this.addCounterForm.reset();
      this.dialogRef.close(counter)
    } else {
      this.showEmptyError = true;
    }
  }
}

export function uniqueCounterIdValidator(counters: Counter[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const selectedCounter = counters.find((counter) => counter.id === value);

    if (selectedCounter) {
      return {uniqueCounterId: true};
    }
    return null;
  };
}

