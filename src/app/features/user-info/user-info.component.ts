import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getTranslatedRole, Role} from "../register/user.model";
import {findGardenByUserID,} from "../list-of-garden-plot/GardenService";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {BackendGardenService} from "../list-of-garden-plot/backend-garden.service";
import {StorageService} from "../../core/storage/storage.service";
import {forkJoin} from "rxjs";
import {UserInfoService} from "./user-info.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
    id: number | null = null;
    profile: Profile | undefined;
    userInfoForm: FormGroup;
    showUserEdit: boolean = true;
    showEditStatus: boolean = true;
    showEditFullStatus: boolean = true;
    showGardener: boolean = true;


    // @ts-ignore
    gardenPlots: GardenPlot[];

    isAvailableToEdit: boolean = true;

    constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private router: Router,
                private listOfUsersService: ListOfUsersService,
                private backendGardenService: BackendGardenService, private storageService: StorageService, private userInfoService: UserInfoService, private spinner: NgxSpinnerService) {
        this.userInfoForm = formBuilder.group({
            firstName: [{value: '', disabled: true}],
            lastName: [{value: '', disabled: true}],
            phoneNumber: [{value: '', disabled: true}],
            email: [{value: '', disabled: true}],
            accountStatus: [{value: '', disabled: true}],
        });
        this.route.params.subscribe(params => {
            this.id = parseInt(params['id'], 10)
        });
        this.spinner.show()
        this.loadData()
    }

    loadData() {
        forkJoin({
            gardenPlots: this.backendGardenService.getAllGardenPlots(),
            profile: this.listOfUsersService.getProfileById(this.id),
            myProfile: this.userInfoService.getMyProfile()
        }).subscribe(data => {
            if ((!(this.storageService.getRoles().includes(Role.ADMIN) || (this.storageService.getRoles().includes(Role.MANAGER)))) && (this.id !== data.myProfile.id)) {
                this.router.navigate(['/403']);
            }
            this.gardenPlots = data.gardenPlots;
            this.profile = data.profile;
            this.initData()
            this.spinner.hide()
        });
    }

    initData() {
        this.isAvailableToEditProfile()
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
        this.userInfoForm.patchValue({
            firstName: profile?.first_name,
            lastName: profile?.last_name,
            phoneNumber: profile?.phone,
            email: profile?.email,
            accountStatus: profile?.groups
        });
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
        accountStatus: [
            {type: 'required', message: 'Proszę podać status'}
        ]
    };
    protected readonly Role = Role;

    enableFormFields() {
        this.showEditStatus = false
        // TODO zobaczyc czy jest endpoint jak jest do zamienic i usunac pobieranie dzialek
        if (findGardenByUserID(this.profile?.id, this.gardenPlots)) {
            this.showGardener = false
        }
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
        //TODO do konca nie jestem pewien czy tak powinienem robic ale taka sytuacja teoretycznie nie powinna wogle sie wydarzyc
        if (!this.showGardener) {
            let tempGroups = this.profile?.groups;
            if(!tempGroups?.includes(Role.GARDENER))
            tempGroups?.push(Role.GARDENER)
            this.userInfoForm.patchValue({
                accountStatus: tempGroups
            })
        }

        this.userInfoForm.get('phoneNumber')?.setValidators([])
        this.userInfoForm.get('accountStatus')?.setValidators([])

        this.userInfoForm.get('email')?.disable();
        this.userInfoForm.updateValueAndValidity();
        this.showUserEdit = false
    }

    disableFormFields() {
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
        if (this.userInfoForm.valid) {
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

            this.listOfUsersService.editProfile(newUser, this.id).subscribe(() => {
            });
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
