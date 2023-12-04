import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Fee, IndividualPayments, Payments, UtilityValues} from "./payments";
import {Role} from "../register/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getAvenues, getNumbers, getSectors} from "../list-of-garden-plot/GardenService";
import {PaymentsService} from "./payments.service";
import {BackendGardenService} from "../list-of-garden-plot/backend-garden.service";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {IndividualPaymentsComponent} from "./individual-payments/individual-payments.component";
import {EditingLeaseFeeComponent} from "./editing-lease-fee/editing-lease-fee.component";
import {EditingUtilityFeeComponent} from "./editing-utility-fee/editing-utility-fee.component";
import {EditingAdditionalFeesComponent} from "./editing-additional-fees/editing-additional-fees.component";
import {EditDateComponent} from "./edit-date/edit-date.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../Profile";
import {EditUtilityValuesComponent} from "./edit-utility-values/edit-utility-values.component";
import {forkJoin} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";


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
  // @ts-ignore
  dataLeaseFees: MatTableDataSource<Fee>;
  // @ts-ignore
  dataUtilityFees: MatTableDataSource<Fee>;
  // @ts-ignore
  dataAdditionalFees: MatTableDataSource<Fee>;

  showDetails = false

  // @ts-ignore
  payment: Payments
  // @ts-ignore
  private gardenPlots: GardenPlot[]
  // @ts-ignore
  individualPaymentsForm: FormGroup;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  numbersOptions: (number | null)[] = [];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private paymentsService: PaymentsService, private gardenPlotsDataService: BackendGardenService, private _snackBar: MatSnackBar,private spinner: NgxSpinnerService) {
    this.spinner.show()
    this.initData()
  }

  initData() {
    forkJoin({
      gardenPlots: this.gardenPlotsDataService.getAllGardenPlots(),
      payments: this.paymentsService.getPayments()
    }).subscribe(async data => {
      this.gardenPlots = data.gardenPlots;
      this.payment = data.payments;
      this.init1()
      this.spinner.hide()
    });
  }

  init1() {
    // @ts-ignore
    this.dataLeaseFees = new MatTableDataSource(this.payment.leaseFees);
    // @ts-ignore
    this.dataUtilityFees = new MatTableDataSource(this.payment.utilityFees);
    // @ts-ignore
    this.dataAdditionalFees = new MatTableDataSource(this.payment.additionalFees);
    this.individualPaymentsForm = this.formBuilder.group({
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
    this.init2()
  }

  init2() {
    this.sectorsOptions = getSectors(this.gardenPlots);
    this.individualPaymentsForm.get('sector')?.valueChanges.subscribe((value) => {
      this.updateAvenous()
      this.individualPaymentsForm.get('number')?.reset()
    });
    this.individualPaymentsForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.updateNumbers()
    });
  }

  private updateAvenous() {
    this.avenuesOptions = getAvenues(this.individualPaymentsForm.get('sector')?.value, this.gardenPlots);
    this.individualPaymentsForm.get('avenue')?.reset()
  }

  private updateNumbers() {
    this.numbersOptions = getNumbers(this.individualPaymentsForm.get('sector')?.value, this.individualPaymentsForm.get('avenue')?.value, this.gardenPlots);
    this.individualPaymentsForm.get('number')?.reset()
  }

  private errorMessages = {
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

  updateData() {
    this.spinner.show()
    this.paymentsService.getPayments().subscribe((payments: Payments) => {
      this.payment = payments;
      this.dataLeaseFees = new MatTableDataSource(this.payment.leaseFees);
      this.dataUtilityFees = new MatTableDataSource(this.payment.utilityFees);
      this.dataAdditionalFees = new MatTableDataSource(this.payment.additionalFees);
      this.spinner.hide()
    });
  }

  selectShowIndividualPayments() {
    if (this.individualPaymentsForm.valid) {
      const sector: string = this.individualPaymentsForm.get('sector')?.value;
      const avenue: string = this.individualPaymentsForm.get('avenue')?.value;
      const number: number = this.individualPaymentsForm.get('number')?.value;
      let individualPayments: IndividualPayments | null
      this.paymentsService.findUserPaymentsByAddress(sector, avenue, number).subscribe((individualPayments2: IndividualPayments | null) => {
        individualPayments = individualPayments2
        const address = `${sector}, ${avenue}, ${number}`
        this.showDetails = true;

        this.showDetailsDialog(individualPayments, address)
      });
    }
  }

  private showDetailsDialog(individualPayments: IndividualPayments | null, address: string) {
    const dialogRef = this.dialog.open(IndividualPaymentsComponent, {
      width: '4000px',
      data: {payments: individualPayments, address: address},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
    });
  }

  selectShowEditingLeasePayments() {
    this.showDetails = true;
    this.showEditingLeasePayments()
  }

  private showEditingLeasePayments() {
    const dialogRef = this.dialog.open(EditingLeaseFeeComponent, {
      width: '4000px',
      data: {leaseFees: this.payment.leaseFees},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      this.updateData()
    });
  }

  selectShowEditingUtilityPayments() {
    this.showDetails = true;
    this.showEditingUtilityPayments()
  }

  private showEditingUtilityPayments() {
    const dialogRef = this.dialog.open(EditingUtilityFeeComponent, {
      width: '4000px',
      data: {utilityFees: this.payment.utilityFees},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      this.updateData()
    });
  }

  selectShowAdditionalPayments() {
    this.showDetails = true;
    this.ShowAdditionalPayments()
  }

  private ShowAdditionalPayments() {
    const dialogRef = this.dialog.open(EditingAdditionalFeesComponent, {
      width: '4000px',
      data: {payments: this.payment.additionalFees},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      // this.updateAdditionalPayments()
      this.updateData()
    });
  }

  openDateDialog(): void {
    const dialogRef = this.dialog.open(EditDateComponent, {
      width: '400px',
      data: {currentDate: this.payment.date}
    });

    dialogRef.afterClosed().subscribe((selectedDate: Date) => {
      if (selectedDate) {
        this.payment.date = selectedDate;
        this.paymentsService.updateDate(selectedDate).subscribe()
      }
    });
  }

  openUtilityDialog(): void {
    const dialogRef = this.dialog.open(EditUtilityValuesComponent, {
      width: '400px',
      data: {utilityValues: this.payment.utilityValues}
    });

    dialogRef.afterClosed().subscribe((Data: UtilityValues) => {
      if (Data) {
        // this.payment.utilityValues = Data;
        this.updateData()
      }
    });
  }

  addPayments() {
    this.paymentsService.confirmALLPayments().subscribe(result => {
      this.showSuccessMessage()
    })
  }

  private showSuccessMessage(): void {
    this._snackBar.open('Pomyślnie dodano opłaty! (tak naprawde to nie)', 'Zamknij', {duration: 4000});
  }

  closeDetails() {
    this.showDetails = false;
  }

  protected readonly Role = Role;
}


