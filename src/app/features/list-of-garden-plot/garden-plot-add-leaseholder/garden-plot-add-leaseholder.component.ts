import {Component, Inject, OnInit} from '@angular/core';
import {GardenPlot, GardenPlotBackend} from "../garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {findProfileEmailByID, uniqueLeaseholderIDValidator} from "../GardenService";
import {getMatchingProfiles, profileEmailValidator} from "../../list-of-users/ProfilesService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";
import {ListOfUsersService} from "../../list-of-users/list-of-users.service";
import {Profile} from "../../Profile";


@Component({
    selector: 'app-garden-plot-add-leaseholder',
    templateUrl: './garden-plot-add-leaseholder.component.html',
    styleUrls: ['./garden-plot-add-leaseholder.component.scss']
})
export class GardenPlotAddLeaseholderComponent implements OnInit {
    leaseHolderOptions: { email: string; fullName: string }[] = [];
    gardenPlot: GardenPlotBackend | undefined;
    addLeaseHolderForm: FormGroup;

    // @ts-ignore
    leasholderID: number | null

    // @ts-ignore
    private profiles: Profile[]
    // @ts-ignore
    private gardenPlots: GardenPlot[]

    closeAddingLeaseHolder() {
        this.dialogRef.close();
    }

    populateFormFromGardenPlot(gardenPlot: GardenPlotBackend | undefined) {
        this.addLeaseHolderForm.patchValue({
            // @ts-ignore
            leaseholderEmail: gardenPlot.leaseholder !== null ? findProfileEmailByID(this.leasholderID, this.profiles) : 'brak',
        });
    }

    constructor(formBuilder: FormBuilder,
                private gardenPlotsDataService: BackendGardenService,
                private listOfUsersService: ListOfUsersService,
                public dialogRef: MatDialogRef<GardenPlotAddLeaseholderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { gardenPlot: GardenPlotBackend }
    ) {
        this.initData()
        this.gardenPlot = data.gardenPlot
        this.addLeaseHolderForm = formBuilder.group({
            leaseholderEmail: [''],
        });
    }

    initData() {
        this.listOfUsersService.sortProfiles()
        this.initProfiles()
        this.initGardenPlots()
    }

    initGardenPlots() {
        this.gardenPlotsDataService.getAllGardenPlots().subscribe((gardenPlots: GardenPlot[]) => {
            this.gardenPlots = gardenPlots;
        });
    }

    initProfiles() {
        this.listOfUsersService.getAllProfiles().subscribe((profiles: Profile[]) => {
            this.profiles = profiles;
        });
    }

    ngOnInit() {
        // @ts-ignore
        let leaseHolder : Profile
         this.gardenPlotsDataService.getLeaseholder(this.gardenPlot?.gardenPlotID).subscribe((leaseholder) => {leaseHolder = leaseholder});
        // @ts-ignore
        if (leaseHolder) {
            this.leasholderID = leaseHolder.profileId
        } else this.leasholderID = null
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

    accept() {
        if (this.addLeaseHolderForm.get('leaseholderEmail')?.value) {
            if (this.addLeaseHolderForm.get('leaseholderEmail')?.value === 'brak') {
                // @ts-ignore
                this.gardenPlot.leaseholderID = null;
                this.gardenPlotsDataService.editLeaseholder(this.gardenPlot?.gardenPlotID, null)
                this.gardenPlotsDataService.editLeaseholder2(this.gardenPlot?.gardenPlotID, null, this.gardenPlots)
                // this.gardenPlotsDataService.editLeaseholder3(this.gardenPlot?.gardenPlotID, null)

                this.closeAddingLeaseHolder();
            } else {
                const selectedProfile = this.profiles.find((profile) => {
                    return profile.email === this.addLeaseHolderForm.get('leaseholderEmail')?.value;
                });

                if (selectedProfile) {
                    // @ts-ignore
                    this.gardenPlot.leaseholderID = selectedProfile.profileId;
                    this.gardenPlotsDataService.editLeaseholder(this.gardenPlot?.gardenPlotID, selectedProfile.profileId)
                    this.gardenPlotsDataService.editLeaseholder2(this.gardenPlot?.gardenPlotID, selectedProfile.profileId, this.gardenPlots)
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


