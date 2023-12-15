import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CalculationType, Fee, FeeType, IndividualPayments, MediaType, Payments, UtilityValues} from "./payments";
import {Role} from "../register/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getAvenues, getNumbers, getSectors} from "../list-of-garden-plot/GardenService";
import {PaymentsService} from "./payments.service";
import {BackendGardenService} from "../list-of-garden-plot/backend-garden.service";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {IndividualPaymentsComponent} from "./individual-payments/individual-payments.component";
import {EditDateComponent} from "./edit-date/edit-date.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {forkJoin, Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {Period} from "./payments.model";
import {PeriodDialogComponent} from "./period-dialog/period-dialog.component";
import {ToastrService} from "ngx-toastr";
import {TopAppBarService} from "../../core/top-app-bar/top-app-bar.service";

// TODO sprawdzic czy jest obslugiwany error

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

    displayedColumns: string[] = ['name', 'type', 'value', 'total_amount'];
    editDisplayedColumns: string[] = ['name', 'type', 'value', 'remove'];

    // @ts-ignore
    dataLeaseFees: MatTableDataSource<Fee>;
    isEditModeLeaseFee: boolean = false;
    editableDataLeaseFees: Fee[] = []; // editable copy of your data
    // @ts-ignore
    dataUtilityFees: MatTableDataSource<Fee>;
    isEditModeUtilityFee: boolean = false;
    editableDataUtilityFees: Fee[] = [];
    // @ts-ignore
    dataAdditionalFees: MatTableDataSource<Fee>;
    isEditModeAdditionalFee: boolean = false;
    editableDataAdditionalFees: Fee[] = [];

    payment?: Payments
    private gardenPlots?: GardenPlot[]
    individualPaymentsForm: FormGroup;

    sectorsOptions: (string | null)[] = [];
    avenuesOptions: (string | null)[] = [];
    numbersOptions: (number | null)[] = [];

    periods: Period[] = [];
    currentPeriodIndex: number = 0;
    currentPeriod?: Period;
    isWaitingForConfirmation: boolean = false;

    constructor(private dialog: MatDialog,
                private formBuilder: FormBuilder,
                private paymentsService: PaymentsService,
                private gardenPlotsDataService: BackendGardenService,
                private _snackBar: MatSnackBar,
                private spinner: NgxSpinnerService,
                private toastr: ToastrService,
                private topAppBarService: TopAppBarService) {
        this.spinner.show()
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
        this.initData()
    }

    initData() {
        forkJoin({
            gardenPlots: this.gardenPlotsDataService.getAllGardenPlots(),
            payments: this.paymentsService.getCurrentPayments(),
            periods: this.paymentsService.getBillingPeriods()
        }).subscribe(
            {
                next: data => {
                    this.gardenPlots = data.gardenPlots;
                    this.payment = data.payments;
                    this.periods = data.periods;
                    this.currentPeriodIndex = this.findCurrentPeriod();
                    this.currentPeriod = this.periods[this.currentPeriodIndex];
                    this.init1()
                    this.checkIfIsWaitingForConfirmation();
                    if (this.isWaitingForConfirmation) {
                        this.toastr.info('Opłaty wymagają zatwierdzenia!', 'Okres rozliczeniowy dobiegł końca!')
                    }
                },
                error: err => {
                    this.spinner.hide();
                },
                complete: () => {
                    this.spinner.hide();
                }
            });
    }

    findCurrentPeriod() {
        const unconfirmedPeriods = this.periods.filter(period => !period.is_confirmed);

        // Find the index of the oldest unconfirmed period
        let oldestPeriodIndex = -1;
        let oldestDate = new Date();

        unconfirmedPeriods.forEach((period, index) => {
            const startDate = new Date(period.start_date);
            if (oldestPeriodIndex === -1 || startDate < oldestDate) {
                oldestDate = startDate;
                oldestPeriodIndex = this.periods.indexOf(period);
            }
        });

        return oldestPeriodIndex;
    }

    init1() {
        this.dataLeaseFees = new MatTableDataSource(this.payment?.lease_fees);
        this.dataUtilityFees = new MatTableDataSource(this.payment?.utility_fees);
        this.dataAdditionalFees = new MatTableDataSource(this.payment?.additional_fees);
        this.init2()
    }

    init2() {
        this.sectorsOptions = getSectors(this.gardenPlots!);
        this.individualPaymentsForm.get('sector')?.valueChanges.subscribe((value) => {
            this.updateAvenous()
            this.individualPaymentsForm.get('number')?.reset()
        });
        this.individualPaymentsForm.get('avenue')?.valueChanges.subscribe((value) => {
            this.updateNumbers()
        });
    }

    private updateAvenous() {
        this.avenuesOptions = getAvenues(this.individualPaymentsForm.get('sector')?.value, this.gardenPlots!);
        this.individualPaymentsForm.get('avenue')?.reset()
    }

    private updateNumbers() {
        this.numbersOptions = getNumbers(this.individualPaymentsForm.get('sector')?.value, this.individualPaymentsForm.get('avenue')?.value, this.gardenPlots!);
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
            if (this.individualPaymentsForm?.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    updateData() {
        if (this.currentPeriod) {
            this.spinner.show()
            this.paymentsService.getPaymentsForPeriod(this.currentPeriod).subscribe({
                next: (payments: Payments) => {
                    this.payment = payments;
                    this.dataLeaseFees = new MatTableDataSource(this.payment.lease_fees);
                    this.dataUtilityFees = new MatTableDataSource(this.payment.utility_fees);
                    this.dataAdditionalFees = new MatTableDataSource(this.payment.additional_fees);
                    this.spinner.hide()
                }, error: err => {
                    this.spinner.hide()
                }
            });
            this.checkIfIsWaitingForConfirmation();
        }
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

                this.showDetailsDialog(individualPayments, address)
            });
        }
    }

    private showDetailsDialog(individualPayments: IndividualPayments | null, address: string) {
        const dialogRef = this.dialog.open(IndividualPaymentsComponent, {
            width: '4000px',
            data: {payments: individualPayments, address: address},
        });
    }

    openDateDialog(): void {
        const dialogRef = this.dialog.open(EditDateComponent, {
            width: 'auto',
            data: {currentDate: this.payment?.payment_date, minDate: this.currentPeriod?.end_date}
        });

        dialogRef.afterClosed().subscribe((selectedDate: Date) => {
            if (selectedDate) {
                this.payment!.payment_date = selectedDate;
                if (this.currentPeriod) {
                    this.paymentsService.updateDate(selectedDate, this.currentPeriod?.id).subscribe({
                        next: value => {
                            this.updateData();
                        },
                        error: err => {
                            this.spinner.hide();
                        }
                    })
                }
            }
        });
    }

    confirmPeriod() {
        if(this.isWaitingForConfirmation) {
            this.paymentsService.confirmPeriod(this.currentPeriod!.id).subscribe(result => {
                this.showSuccessMessage();
                this.topAppBarService.fetchNotificationsSubject.next(true);
                this.updateData();
            })
        }
    }

    private showSuccessMessage(): void {
        this.toastr.success('Pomyślnie zatwierdzono okres!');
    }

    moveToNextPeriod() {
        if (this.currentPeriodIndex < this.periods.length - 1) {
            this.currentPeriodIndex++;
            this.currentPeriod = this.periods[this.currentPeriodIndex]
            this.updateData();
        }
    }

    moveToPreviousPeriod() {
        if (this.currentPeriodIndex > 0) {
            this.currentPeriodIndex--;
            this.currentPeriod = this.periods[this.currentPeriodIndex]
            this.updateData();
        }
    }

    protected readonly Role = Role;

    addNewPeriod() {
        const dialogRef = this.dialog.open(PeriodDialogComponent, {
            data: this.periods.length > 0 ? this.periods[this.periods.length - 1] : null,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.initData();
        });
    }

    currentPeriodIsActive(): boolean {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!this.currentPeriod) {
            return false;
        }
        return today >= this.currentPeriod.start_date && today <= this.currentPeriod.end_date;
    }

    checkIfIsWaitingForConfirmation() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!this.currentPeriod) {
            this.isWaitingForConfirmation = false;
        }
        // @ts-ignore
        this.isWaitingForConfirmation = today >= new Date(this.currentPeriod.end_date) && !this.currentPeriod.is_confirmed;
    }

    saveLeaseFee() {
        const observables: Observable<Fee>[] = [];

        if (this.editableDataLeaseFees.length > 0) {
            this.editableDataLeaseFees.forEach(
                fee => {
                    if (fee.id === -1) {
                        observables.push(this.paymentsService.addFee(fee));
                    } else {
                        observables.push(this.paymentsService.editFee(fee.id, fee));
                    }
                }
            )

            forkJoin(observables).subscribe(
                results => {
                    this.isEditModeLeaseFee = false;
                    this.dataLeaseFees.data = this.editableDataLeaseFees;
                }
            )
        } else {
            this.isEditModeLeaseFee = false;
        }
    }

    enterEditModeLeaseFee() {
        this.isEditModeLeaseFee = true;
        this.editableDataLeaseFees = this.dataLeaseFees.data.map(fee => ({...fee}));
    }

    addEmptyRowLeaseFee() {
        this.editableDataLeaseFees.push({
            id: -1,
            name: '',
            calculation_type: CalculationType.PerMeter,
            value: 0,
            fee_type: FeeType.Lease,
            billing_period: this.currentPeriod?.id
        })
        this.editableDataLeaseFees = [...this.editableDataLeaseFees]; // Create a new instance to trigger update
    }

    removeRowLeaseFee(feeToRemove: Fee) {
        this.editableDataLeaseFees = this.editableDataLeaseFees.filter(fee => fee !== feeToRemove);
    }

    saveUtilityFee() {
        const observables: Observable<Fee>[] = [];

        if (this.editableDataUtilityFees.length > 0) {
            this.editableDataUtilityFees.forEach(
                fee => {
                    if (fee.id === -1) {
                        observables.push(this.paymentsService.addFee(fee));
                    } else {
                        observables.push(this.paymentsService.editFee(fee.id, fee));
                    }
                }
            )

            forkJoin(observables).subscribe(
                results => {
                    this.isEditModeUtilityFee = false;
                    this.dataUtilityFees.data = this.editableDataUtilityFees;
                }
            )
        } else {
            this.isEditModeUtilityFee = false;
        }
    }

    enterEditModeUtilityFee() {
        this.isEditModeUtilityFee = true;
        this.editableDataUtilityFees = this.dataUtilityFees.data.map(fee => ({...fee}));
    }

    removeRowUtilityFee(feeToRemove: Fee) {
        this.editableDataUtilityFees = this.editableDataUtilityFees.filter(fee => fee !== feeToRemove);

    }

    addEmptyRowUtilityFee() {
        this.editableDataUtilityFees.push({
            id: -1,
            name: '',
            calculation_type: CalculationType.PerMeter,
            value: 0,
            fee_type: FeeType.Utility,
            billing_period: this.currentPeriod?.id
        })
        this.editableDataUtilityFees = [...this.editableDataUtilityFees];
    }

    saveAdditionalFee() {
        const observables: Observable<Fee>[] = [];

        if (this.editableDataAdditionalFees.length > 0) {
            this.editableDataAdditionalFees.forEach(
                fee => {
                    if (fee.id === -1) {
                        observables.push(this.paymentsService.addFee(fee));
                    } else {
                        observables.push(this.paymentsService.editFee(fee.id, fee));
                    }
                }
            )

            forkJoin(observables).subscribe(
                results => {
                    this.isEditModeAdditionalFee = false;
                    this.dataAdditionalFees.data = this.editableDataAdditionalFees;
                }
            )
        } else {
            this.isEditModeAdditionalFee = false;
        }
    }

    enterEditModeAdditionalFee() {
        this.isEditModeAdditionalFee = true;
        this.editableDataAdditionalFees = this.dataAdditionalFees.data.map(fee => ({...fee}));
    }

    removeRowAdditionalFee(feeToRemove: Fee) {
        this.editableDataAdditionalFees = this.editableDataAdditionalFees.filter(fee => fee !== feeToRemove);

    }

    addEmptyRowAdditionalFee() {
        this.editableDataAdditionalFees.push({
            id: -1,
            name: '',
            calculation_type: CalculationType.PerMeter,
            value: 0,
            fee_type: FeeType.Additional,
            billing_period: this.currentPeriod?.id
        })
        this.editableDataAdditionalFees = [...this.editableDataAdditionalFees];
    }

    protected readonly TypeOfFee = CalculationType;
    protected readonly Object = Object;
    protected readonly MediaType = MediaType;
}


