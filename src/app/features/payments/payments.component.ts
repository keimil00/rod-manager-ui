import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Fee, IndividualPayments, Payments} from "./payments";
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

    showDetails = false

    // @ts-ignore
    payment: Payments
    // @ts-ignore
    private gardenPlots: GardenPlot[]

    individualPaymentsForm: FormGroup;

    sectorsOptions: (string | null)[] = [];
    avenuesOptions: (string | null)[] = [];
    numbersOptions: (number | null)[] = [];

    constructor(private dialog: MatDialog, formBuilder: FormBuilder, private paymentsService: PaymentsService, private gardenPlotsDataService: BackendGardenService) {
        this.initData()
        // @ts-ignore
        this.dataLeaseFees = new MatTableDataSource(this.payment.leaseFees);
        // @ts-ignore
        this.dataUtilityFees = new MatTableDataSource(this.payment.utilityFees);
        // @ts-ignore
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

    private initData() {
        this.payment = this.paymentsService.getPayments()
        this.gardenPlots = this.gardenPlotsDataService.getAllGardenPlots()
    }

    private updateAdditionalPayments() {
        this.dataAdditionalFees._updateChangeSubscription();
    }

    // TODO backend
    // private initData() {
    //   this.gardenPlotsDataService.getAllGardenPlots().subscribe(
    //     (data: GardenPlot[]) => {
    //       this.gardenPlots = data
    //     },
    //     (error) => {
    //       console.error('There was an error!', error);
    //     }
    //   );
    //   this.paymentsService.getPayments().subscribe(
    //     (data: Payments) => {
    //       this.payment = data
    //     },
    //     (error) => {
    //       console.error('There was an error!', error);
    //     }
    //   );
    // }

     ngOnInit() {
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

    selectShowIndividualPayments() {
        if (this.individualPaymentsForm.valid) {
            const sector: string = this.individualPaymentsForm.get('sector')?.value;
            const avenue: string = this.individualPaymentsForm.get('avenue')?.value;
            const number: number = this.individualPaymentsForm.get('number')?.value;

            const individualPayments = this.paymentsService.findUserPaymentsByAddress(sector, avenue, number, this.gardenPlots)
            const address = `${sector}, ${avenue}, ${number}`
            this.showDetails = true;
            this.showDetailsDialog(individualPayments, address)
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
            this.updateAdditionalPayments()
        });
    }

    closeDetails() {
        this.showDetails = false;
    }

    protected readonly Role = Role;
}


