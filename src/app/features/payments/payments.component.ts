import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Fee, Payments, TypeOfFee} from "./payments";
import {Role} from "../register/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {gardenPlots, getAvenues, getSectors, uniqueGardenValidator} from "../list-of-garden-plot/GardenService";


//TODO na tym ekranie od terminu płatności zrobic przysik zatwierdz z jakaś uwagą ze beda naliczone te koszty co wyzej i nie będzie mozna tego zmienić plus dane z obecnego stanu liczników
// ten przycisk bedzie wysyłał wszytskim opłate (zmiana stanu konta plus wysłanie jakiegos meila) na licznikach i do raportu tez jakos ustawic zeby brało odpowiednie dane
//dane z licznika to po prostu bedzie zapisywało te dane licznikow po kliknieciu tego przycisku

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  displayedColumns: string[] = ['name', 'type', 'value'];
  dataLeaseFees: MatTableDataSource<Fee>;
  dataUtilityFees: MatTableDataSource<Fee>;
  dataAdditionalFees: MatTableDataSource<Fee>;

  payment:Payments

  individualPaymentsForm: FormGroup;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  numbersOptions: (number | null)[] = [];

  constructor(private dialog: MatDialog,formBuilder: FormBuilder) {
    this.payment = payments
    this.dataLeaseFees = new MatTableDataSource(this.payment.leaseFees);
    this.dataUtilityFees = new MatTableDataSource(this.payment.utilityFees);
    this.dataAdditionalFees = new MatTableDataSource(this.payment.additionalFees);
    this.individualPaymentsForm = formBuilder.group({
      sector: ['', [
        Validators.required,
      ]],
      avenue: ['', [
        Validators.required,
      ]],
      number: ['', [
        Validators.required,
      ]],
    });
  }

  ngOnInit() {
    this.sectorsOptions = getSectors(this.individualPaymentsForm.get('sector')?.value, gardenPlots);
    this.individualPaymentsForm.get('sector')?.valueChanges.subscribe((value) => {
      this.sectorsOptions = getSectors(this.individualPaymentsForm.get('sector')?.value, gardenPlots);
      this.updateAvenous()
    });

    this.avenuesOptions = getAvenues(this.individualPaymentsForm.get('avenue')?.value, this.individualPaymentsForm.get('sector')?.value, gardenPlots);
    this.individualPaymentsForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.updateAvenous()
    });
  }
  updateAvenous() {
    this.avenuesOptions = getAvenues(this.individualPaymentsForm.get('avenue')?.value, this.individualPaymentsForm.get('sector')?.value, gardenPlots);
  }

  errorMessages = {
    sector: [
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    avenue: [
      {type: 'required', message: 'Proszę podać poprawną aleje'}
    ],
    number: [
      {type: 'required', message: 'Proszę podać poprawny numer'}
    ],
  };

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.individualPaymentsForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  protected readonly Role = Role;
}

export let leaseFees: Fee[] = [
  {
    name: 'PZD',
    type: TypeOfFee.PerMeter,
    value: 0.12,
  },
  {
    name: 'Opłata ogrodowa',
    type: TypeOfFee.PerMeter,
    value: 0.61,
  },
  {
    name: 'Opłata Inwestycyjna',
    type: TypeOfFee.PerMeter,
    value: 0.5,
  }
];
export let utilityFees: Fee[] = [
  {
    name: 'Prąd',
    type: TypeOfFee.PerMeter,
    value: 0.12,
  },
  {
    name: 'Woda',
    type: TypeOfFee.PerMeter,
    value: 0.61,
  },
];
export let additionalFees: Fee[] = [
  {
    name: 'Koszenie trawy',
    type: TypeOfFee.PerGardenPlot,
    value: 70,
  },
  {
    name: 'Grabienie liści',
    type: TypeOfFee.PerGardenPlot,
    value: 40,
  },
];

export let payments: Payments= {
  leaseFees: leaseFees,
  utilityFees: utilityFees,
  additionalFees: additionalFees,
  date: new Date(2023, 10, 31)
}
