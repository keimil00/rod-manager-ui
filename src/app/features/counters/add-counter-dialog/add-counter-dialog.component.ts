import {Component, Inject} from '@angular/core';
import {Counter, CounterType} from "../counter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {
  findGardenPlotIdByAddress,
  getMatchingAvenuesWithCounter,
  getMatchingNumbersWithCounter,
  getMatchingSectorsWithCounter
} from "../../list-of-garden-plot/GardenService";
import {GardenPlot} from "../../list-of-garden-plot/garden-plot";
import {BackendGardenService} from "../../list-of-garden-plot/backend-garden.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-add-counter-dialog',
  templateUrl: './add-counter-dialog.component.html',
  styleUrls: ['./add-counter-dialog.component.scss']
})
export class AddCounterDialogComponent {
  isWaterType: boolean;
  addCounterForm: FormGroup;
  showEmptyError: boolean = false;
  showGardenAddress: boolean = false;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  numbersOptions: (number | null)[] = [];

  // @ts-ignore
  private gardenPlots: GardenPlot[]

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCounterDialogComponent>,
    private gardenPlotsDataService: BackendGardenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: { counters: Counter[], isShowWater: boolean }
  ) {
    this.isWaterType = this.data.isShowWater
    this.initData()
    this.addCounterForm = formBuilder.group({
      id: ['', [Validators.required, uniqueCounterIdValidator(this.data.counters)]],
      address: [''],
      measurement: [0, [Validators.required, Validators.min(0)]],
      sector: [null],
      avenue: [null],
      number: [null],
      showGardenAddress: [false]
    });

    this.showGardenAddressValueSubscribe()
  }

  resetValues() {
    this.addCounterForm.patchValue({
      sector: null,
      avenue: null,
      number: null
    });
  }

  showGardenAddressValueSubscribe() {
    this.addCounterForm.get('showGardenAddress')?.valueChanges.subscribe((value: boolean) => {
      const addressControl = this.addCounterForm.get('address');
      if (value) {
        // If the checkbox is checked, the "sector", "avenue" and "number" fields become required
        this.addCounterForm.get('sector')?.setValidators([Validators.required]);
        this.addCounterForm.get('avenue')?.setValidators([Validators.required]);
        this.addCounterForm.get('number')?.setValidators([Validators.required]);
        addressControl?.setValidators([])
      } else {
        this.addCounterForm.get('sector')?.clearValidators();
        this.addCounterForm.get('avenue')?.clearValidators();
        this.addCounterForm.get('number')?.clearValidators();
        addressControl?.setValidators([Validators.required]);
      }
      this.addCounterForm.get('sector')?.updateValueAndValidity();
      this.addCounterForm.get('avenue')?.updateValueAndValidity();
      this.addCounterForm.get('number')?.updateValueAndValidity();
      addressControl?.updateValueAndValidity();
    });
  }

  initData() {
    this.spinner.show()
    this.gardenPlotsDataService.getAllGardenPlots().subscribe({next: (gardenPlots: GardenPlot[]) => {
      this.gardenPlots = gardenPlots;
      this.spinner.hide()
      this.matchingSectors()
    }, error: error => {
      console.error(error);
      this.spinner.hide()
      this.toastr.error('Nie udało się pobrać działek', 'Błąd')
      }
    });
  }


  matchingSectors() {
    this.sectorsOptions = getMatchingSectorsWithCounter(this.data.counters, this.gardenPlots, this.isWaterType);
    this.addCounterForm.get('sector')?.valueChanges.subscribe((value) => {
      this.sectorsOptions = getMatchingSectorsWithCounter(this.data.counters, this.gardenPlots, this.isWaterType);
    })

    this.addCounterForm.get('sector')?.valueChanges.subscribe((value) => {
      this.avenuesOptions = getMatchingAvenuesWithCounter(this.data.counters, this.gardenPlots, this.addCounterForm.get('sector')?.value, this.isWaterType)
      this.numbersOptions = []
    });

    this.addCounterForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.numbersOptions = getMatchingNumbersWithCounter(this.data.counters, this.gardenPlots, this.addCounterForm.get('sector')?.value, this.addCounterForm.get('avenue')?.value, this.isWaterType)
    });
  }


  changeType() {
    this.isWaterType = !this.isWaterType
    this.resetValues()
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
      {type: 'required', message: 'Proszę podać numer seryjny licznika'},
      {type: 'uniqueCounterId', message: 'Istnieje już licznik o takim numerze seryjnym'},
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

      let gardenPlotID: number | null = null;
      let finalAddress: string | null;

      if (this.showGardenAddress) {
        finalAddress = newSector + ', ' + newAvenue + ', ' + newNumber;
        gardenPlotID = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, this.gardenPlots)
      } else {
        finalAddress = newAddress;
      }

      const id = Math.floor(Math.random() * (10000000 - 1000 + 1)) + 1000;

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

