import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../Profile";
import {GardenPlot, GardenPlotBackend} from "../list-of-garden-plot/garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getTranslatedRole, Role} from "../register/user.model";
import {
    findGardenByID,
    findGardenByUserID,
    findGardenPlotIdByAddress, uniqueLeaseholderIDValidator,
} from "../list-of-garden-plot/GardenService";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {BackendGardenService} from "../list-of-garden-plot/backend-garden.service";
import {StorageService} from "../../core/storage/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {forkJoin} from "rxjs";
import {getMatchingProfiles, profileEmailValidator} from "../list-of-users/ProfilesService";
import {TopBarService} from "../../core/top-app-bar/top-bar.service";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
    id: number | null = null;
    profile: Profile | undefined;
    userInfoForm: FormGroup;
    showGardenAddress: boolean = false;
    showUserEdit: boolean = true;
    showEditStatus: boolean = true;
    showEditFullStatus: boolean = true;

    sectorsOptions: (string | null)[] = [];
    avenuesOptions: (string | null)[] = [];
    numbersOptions: (number | null)[] = [];

    // @ts-ignore
    profiles: Profile[];
    // @ts-ignore
    gardenPlots: GardenPlot[];

    isAvailableToEdit: boolean = true;

    constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private router: Router,
                private listOfUsersService: ListOfUsersService,
                private backendGardenService: BackendGardenService, private storageService: StorageService, private topBarService: TopBarService) {
        this.userInfoForm = formBuilder.group({
            firstName: [{value: '', disabled: true}],
            lastName: [{value: '', disabled: true}],
            phoneNumber: [{value: '', disabled: true}],
            email: [{value: '', disabled: true}],
            plotSector: [{value: '', disabled: true}],
            plotAvenue: [{value: '', disabled: true}],
            plotNumber: [{value: 0, disabled: true}],
            accountStatus: [{value: '', disabled: true}],
        });
        this.route.params.subscribe(params => {
            this.id = parseInt(params['id'], 10)
        });
        this.loadData()
    }

    loadData() {
        forkJoin({
            profiles: this.listOfUsersService.getAllProfiles(),
            gardenPlots: this.backendGardenService.getAllGardenPlots(),
            profile: this.listOfUsersService.getProfileById(this.id),
            myProfile: this.topBarService.getMyProfile()
        }).subscribe(data => {
            if ((!(this.storageService.getRoles().includes(Role.ADMIN) || (this.storageService.getRoles().includes(Role.MANAGER))))&&(this.id !== data.myProfile.id)) {
                this.router.navigate(['/403']);
            }
            this.profiles = data.profiles;
            this.gardenPlots = data.gardenPlots;
            this.profile = data.profile;
            this.initData()
        });
    }

    initData() {
        this.isAvailableToEditProfile()


        if (findGardenByUserID(this.id, this.gardenPlots)) {
            this.showGardenAddress = true
        }
        this.sectorsOptions = this.getMatchingSectors(this.profiles, this.gardenPlots);

        this.userInfoForm.get('plotSector')?.valueChanges.subscribe((value) => {
            this.avenuesOptions = this.getMatchingAvenues(this.profiles, this.gardenPlots, this.userInfoForm.get('plotSector')?.value)
            this.numbersOptions = []
        });

        this.userInfoForm.get('plotAvenue')?.valueChanges.subscribe((value) => {
            this.numbersOptions = this.getMatchingNumbers(this.profiles, this.gardenPlots, this.userInfoForm.get('plotSector')?.value, this.userInfoForm.get('plotAvenue')?.value)
        });
        this.populateFormFromGardenPlot(this.profile);
    }

    isAvailableToEditProfile() {
        // @ts-ignore
        if ((this.profile?.groups.includes(Role.ADMIN)) || (this.profile?.groups.includes(Role.MANAGER))) {
            if (this.storageService.getRoles().includes(Role.MANAGER)) {
                this.isAvailableToEdit = false;
            }
        }
    }


    populateFormFromGardenPlot(profile: Profile | undefined) {
        const address = this.findPlotAddressTupleByUserId(this.gardenPlots, profile?.id);
        this.userInfoForm.patchValue({
            firstName: profile?.first_name,
            lastName: profile?.last_name,
            phoneNumber: profile?.phone,
            email: profile?.email,
            plotSector: address?.sector,
            plotAvenue: address?.avenue,
            plotNumber: address?.number,
            accountStatus: profile?.groups
        });
    }

    findPlotAddressTupleByUserId(gardenPlots: GardenPlot[], id: number | undefined): {
        sector: string | null;
        avenue: string | null;
        number: number
    } | null {
        const foundPlot = gardenPlots.find(plot => plot.leaseholderID === id);

        if (foundPlot) {
            const {sector, avenue, number} = foundPlot;
            return {sector, avenue, number};
        }
        return null;
    }

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.userInfoForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    errorMessages = {
        firstName: [
            {type: 'required', message: 'Proszę podać imię'},
        ],
        lastName: [
            {type: 'required', message: 'Proszę podać nazwisko'},
        ],
        phoneNumber: [
            {type: 'required', message: 'Proszę podać numer telefonu'},
        ],
        plotSector: [
            {type: 'required', message: 'Proszę podać sektor'},
        ],
        plotAvenue: [
            {type: 'required', message: 'Proszę podać poprawną aleje'}
        ],
        plotNumber: [
            {type: 'required', message: 'Proszę podać numer'},
            {type: 'goodAdress', message: 'Proszę podać poprawny numer'}
        ],
        accountStatus: [
            {type: 'required', message: 'Proszę podać status'}
        ]
    };
    protected readonly Role = Role;

    enableFormFields() {
        this.showGardenAddress = true;

        this.showEditStatus = false
        if (
            (this.profile?.groups.some((status) => status === Role.ADMIN)) ||
            (this.profile?.groups.some((status) => status === Role.MANAGER))
        ) {
            this.showEditFullStatus = true
        } else this.showEditFullStatus = false

        Object.keys(this.userInfoForm.controls).forEach(controlName => {
            const control = this.userInfoForm.get(controlName);
            if (control) {
                control.enable();
                control.setValidators([Validators.required]);
                control.updateValueAndValidity();
            }
        });

        this.userInfoForm.get('phoneNumber')?.setValidators([])
        this.userInfoForm.get('accountStatus')?.setValidators([])
        this.userInfoForm.get('plotSector')?.setValidators([])
        this.userInfoForm.get('plotAvenue')?.setValidators([])
        this.userInfoForm.get('plotNumber')?.setValidators([])

        this.userInfoForm.get('email')?.disable();
        this.userInfoForm.updateValueAndValidity();
        this.showUserEdit = false
    }

    disableFormFields() {
        if (findGardenByUserID(this.id, this.gardenPlots)) {
            this.showGardenAddress = true
        } else {
            this.showGardenAddress = false
        }
        this.showEditStatus = false;
        this.showUserEdit = true
        Object.keys(this.userInfoForm.controls).forEach(controlName => {
            const control = this.userInfoForm.get(controlName);
            if (control) {
                control.disable()
                control.setValidators([]);
                control.updateValueAndValidity();
            }
        });
    }


    editProfile() {
        const newSector: string = this.userInfoForm.get('plotSector')?.value;
        const newAvenue: string = this.userInfoForm.get('plotAvenue')?.value;
        const newNumber: number = this.userInfoForm.get('plotNumber')?.value;
        let goodAdress: boolean = false

        let gardenID = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, this.gardenPlots)
        let garden;
        if (gardenID) {
            garden = findGardenByID(gardenID, this.gardenPlots)
            if (garden) {
                goodAdress = true
            }
        }

        if (newSector === null || newSector === undefined)
            goodAdress = true

        if (this.userInfoForm.valid && goodAdress) {
            const newFirstName: string = this.userInfoForm.get('firstName')?.value;
            const newLastName: string = this.userInfoForm.get('lastName')?.value;
            const newPhoneNumber: string = this.userInfoForm.get('phoneNumber')?.value;

            let newStatus: Role[] = this.userInfoForm.get('accountStatus')?.value;

            const newUser: any = {
                first_name: newFirstName,
                last_name: newLastName,
                email: this.profile?.email,
                phone: newPhoneNumber,
                groups: newStatus,
                // TODO
                // // @ts-ignore
                // paymentAmount: this.profile?.paymentAmount,
                // // @ts-ignore
                // paymentDueDate: this.profile?.paymentDueDate
            };

            if (newSector !== null) {
                let idToNull = findGardenByUserID(this.id, this.gardenPlots)?.gardenPlotID
                this.backendGardenService.updateLeaseholderID(idToNull, null)
                this.backendGardenService.updateLeaseholderID(gardenID, this.id)
            }
            this.listOfUsersService.editProfile(newUser, this.id).subscribe(() => {});
            // this.profile = newUser;
            this.disableFormFields()
        }
    }

    getMatchingSectors(profiles: Profile[], gardenPlots: GardenPlot[]): (string | null)[] {
        const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
            return (
                !profiles.some((profile) => profile.id === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID));
        });

        const sectorsSet = new Set(availableGardenPlots.map((gardenPlot) => gardenPlot.sector));
        const uniqueSectors = Array.from(sectorsSet).sort();

        return uniqueSectors;
    }

    getMatchingAvenues(profiles: Profile[], gardenPlots: GardenPlot[], sector: string | null): (string | null)[] {
        const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
            return (
                (!profiles.some((profile) => profile.id === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID)) &&
                (gardenPlot.sector === sector)
            );
        });

        const avenuesSet = new Set(availableGardenPlots.map((gardenPlot) => gardenPlot.avenue));
        const uniqueAvenues = Array.from(avenuesSet).sort();

        return uniqueAvenues;
    }

    getMatchingNumbers(profiles: Profile[], gardenPlots: GardenPlot[], sector: string | null, avenue: string | null,):
        ((number | null)[]) {
        const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
            return (
                (!profiles.some((profile) => profile.id === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID)) && (gardenPlot.sector === sector) && (gardenPlot.avenue === avenue));
        });

        const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.number);
        sectors.sort();
        return (sectors);
    }

    protected readonly Object = Object;
    protected readonly Role_temp = Role;
    protected readonly Role_temp2 = Role_temp2;
    protected readonly getTranslatedRole = getTranslatedRole;
}


//TODO zmienic bo to jest tylko chwilowe
enum Role_temp2 {
    GARDENER = 'GARDENER',
    TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
    NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
}
