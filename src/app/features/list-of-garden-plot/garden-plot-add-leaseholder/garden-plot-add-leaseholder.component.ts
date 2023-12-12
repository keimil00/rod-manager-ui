import {Component, Inject, OnInit} from '@angular/core';
import {GardenPlot, GardenPlotWithLeaseholder} from "../garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {uniqueLeaseholderIDValidator} from "../GardenService";
import {findProfileEmailByID, getMatchingProfiles, profileEmailValidator} from "../../list-of-users/ProfilesService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";
import {ListOfUsersService} from "../../list-of-users/list-of-users.service";
import {Profile} from "../../Profile";
import {forkJoin} from "rxjs";


@Component({
    selector: 'app-garden-plot-add-leaseholder',
    templateUrl: './garden-plot-add-leaseholder.component.html',
    styleUrls: ['./garden-plot-add-leaseholder.component.scss']
})
export class GardenPlotAddLeaseholderComponent implements OnInit {
    leaseHolderOptions: { email: string; fullName: string }[] = [];
    gardenPlot: GardenPlotWithLeaseholder | undefined;
    addLeaseHolderForm: FormGroup;

    // @ts-ignore
    leasholderID: number | null | undefined

    // @ts-ignore
    private profiles: Profile[]
    // @ts-ignore
    private gardenPlots: GardenPlot[]

    closeAddingLeaseHolder() {
        this.dialogRef.close();
    }

    populateFormFromGardenPlot(gardenPlot: GardenPlotWithLeaseholder | undefined) {
        this.addLeaseHolderForm.patchValue({
          // @ts-ignore
            leaseholderEmail: gardenPlot.leaseholder !== null ? findProfileEmailByID(this.leasholderID, this.profiles) : 'brak',
        });
    }

    constructor(formBuilder: FormBuilder,
                private gardenPlotsDataService: BackendGardenService,
                private listOfUsersService: ListOfUsersService,
                public dialogRef: MatDialogRef<GardenPlotAddLeaseholderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { gardenPlot: GardenPlotWithLeaseholder }
    ) {
        this.gardenPlot = data.gardenPlot
        this.addLeaseHolderForm = formBuilder.group({
            leaseholderEmail: [''],
        });
        this.loadData();
    }

    loadData() {
        forkJoin({
            profiles: this.listOfUsersService.getAllProfiles(),
            gardenPlots: this.gardenPlotsDataService.getAllGardenPlots(),
            // leaseholder: this.gardenPlotsDataService.getLeaseholder(this.gardenPlot?.gardenPlotID)
        }).subscribe(data => {
            this.profiles = data.profiles;
            this.gardenPlots = data.gardenPlots;

            this.leasholderID = this.gardenPlot?.leaseholderID
            this.initData();
        });
    }

    initData() {
        this.addLeaseHolderForm.get('leaseholderEmail')?.setValidators([Validators.required, profileEmailValidator(this.profiles), uniqueLeaseholderIDValidator(this.gardenPlots, this.profiles, true, this.leasholderID)])

        this.leaseHolderOptions = [{
            fullName: 'brak',
            email: 'brak'
        }, ...getMatchingProfiles(this.addLeaseHolderForm.get('leaseholderEmail')?.value, this.profiles, this.gardenPlots, true, this.leasholderID)];

        this.addLeaseHolderForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
            this.leaseHolderOptions = [{
                fullName: 'brak',
                email: 'brak'
            }, ...getMatchingProfiles(value, this.profiles, this.gardenPlots, true, this.leasholderID)];
        });

        this.populateFormFromGardenPlot(this.gardenPlot);
    }

    ngOnInit() {

    }

    accept() {
        if (this.addLeaseHolderForm.get('leaseholderEmail')?.value) {
            if (this.addLeaseHolderForm.get('leaseholderEmail')?.value === 'brak') {
                // @ts-ignore
                this.gardenPlot.leaseholderID = null;
                this.gardenPlotsDataService.editLeaseholder(this.gardenPlot?.gardenPlotID, null).subscribe()
                // this.gardenPlotsDataService.editLeaseholder3(this.gardenPlot?.gardenPlotID, null)

                this.closeAddingLeaseHolder();
            } else {
                const selectedProfile = this.profiles.find((profile) => {
                    return profile.email === this.addLeaseHolderForm.get('leaseholderEmail')?.value;
                });

                if (selectedProfile) {
                    // @ts-ignore
                    this.gardenPlot.leaseholderID = selectedProfile.id;
                    this.gardenPlotsDataService.editLeaseholder(this.gardenPlot?.gardenPlotID, selectedProfile.id).subscribe()
                    // this.gardenPlotsDataService.editLeaseholder3(this.gardenPlot?.gardenPlotID, selectedProfile.profileId)

                    this.closeAddingLeaseHolder();
                }
            }
        }
    }

    errorMessages = {
        leaseholderEmail: [
            {type: 'required', message: 'Proszę wybrać dzierżawcę z listy'},
            {type: 'invalidProfileEmail', message: 'Proszę wybrać poprawny profil'},
            {type: 'nonUniqueLeaseholderID', message: 'Profil jest już przypisany do innej działki'},
        ],
    };

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.addLeaseHolderForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }
}


