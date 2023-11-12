import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile, Role_temp} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {
  profiles
} from "../list-of-garden-plot/garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {gardenPlots} from "../list-of-garden-plot/list-of-garden-plot.component";
import {counters} from "../counters/counters.component";
import {Role} from "../register/user.model";
import {
  findGardenPlotIdByAddress,
  getMatchingAvenues,
  getMatchingSectors,
} from "../counters/add-counter-dialog/add-counter-dialog.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  id: string | null = null;
  profile: Profile | undefined;
  userInfoForm: FormGroup;
  showGardenAddress: boolean = false;
  showUserEdit: boolean = true;
  showEditStatus: boolean = true;
  showEditFullStatus: boolean = true;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  numbersOptions: (number | null)[] = [];

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private router: Router) {
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
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.profile = this.getProfileById(this.id)
    });

    if (findGardenByUserID(this.id, gardenPlots)) {
      this.showGardenAddress = true
    }

    this.sectorsOptions = this.getMatchingSectors(profiles, gardenPlots);

    this.userInfoForm.get('plotSector')?.valueChanges.subscribe((value) => {
      this.avenuesOptions = this.getMatchingAvenues(profiles, gardenPlots, this.userInfoForm.get('plotSector')?.value)
      this.numbersOptions = []
    });

    this.userInfoForm.get('plotAvenue')?.valueChanges.subscribe((value) => {
      this.numbersOptions = this.getMatchingNumbers(profiles, gardenPlots, this.userInfoForm.get('plotSector')?.value, this.userInfoForm.get('plotAvenue')?.value)
    });
    this.populateFormFromGardenPlot(this.profile);
  }

  populateFormFromGardenPlot(profile: Profile | undefined) {
    const address = this.findPlotAddressTupleByUserId(gardenPlots, profile?.id);
    this.userInfoForm.patchValue({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      phoneNumber: profile?.phoneNumber,
      email: profile?.email,
      plotSector: address?.sector,
      plotAvenue: address?.avenue,
      plotNumber: address?.number,
      accountStatus: profile?.accountStatus
    });
  }

  getProfileById(id: string | null) {
    return profiles.find(profile => profile.id === id);
  }

  findPlotAddressTupleByUserId(gardenPlots: GardenPlot[], id: string | undefined): {
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
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    lastName: [
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    phoneNumber: [
      {type: 'required', message: 'Proszę podać sektor'},
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
      {type: 'required', message: 'Proszę podać poprawny numer'}
    ]
  };
  protected readonly Role = Role;

  enableFormFields() {
    this.showGardenAddress = true;

    this.showEditStatus = false
    if (
      (this.profile?.accountStatus.some((status) => status === Role_temp.ADMIN)) ||
      (this.profile?.accountStatus.some((status) => status === Role_temp.MANAGER))
    ) {
      this.showEditFullStatus = true
    } else this.showEditFullStatus = false

    Object.keys(this.userInfoForm.controls).forEach(controlName => {
      const control = this.userInfoForm.get(controlName);
      if (control) {
        control.enable();
        control.setValidators([Validators.required]); // Ustawienie walidatora Validators.required
        control.updateValueAndValidity(); // Aktualizacja walidatora
      }
    });

    // Przekazywanie wartości pól, nie wywoływanie funkcji
    const sector = this.userInfoForm.get('plotSector')?.value;
    const avenue = this.userInfoForm.get('plotAvenue')?.value;

    this.userInfoForm.get('plotNumber')?.setValidators([
      Validators.required,
      this.goodAdressValidator(sector, avenue, gardenPlots)
    ]);

    this.userInfoForm.get('email')?.disable();
    this.userInfoForm.updateValueAndValidity();
    this.showUserEdit = false
  }


  editProfile() {
    if (this.userInfoForm.valid) {
      const newFirstName: number = this.userInfoForm.get('firstName')?.value;
      const newLastName: number = this.userInfoForm.get('lastName')?.value;
      const newPhoneNumber: number = this.userInfoForm.get('phoneNumber')?.value;
      const newSector: string = this.userInfoForm.get('plotSector')?.value;
      const newAvenue: string = this.userInfoForm.get('plotAvenue')?.value;
      const newNumber: number = this.userInfoForm.get('plotNumber')?.value;
      const newStatus: Role_temp = this.userInfoForm.get('status')?.value;

      const newUser: Profile = {
        // @ts-ignore
        id: this.id,
        // @ts-ignore
        userID: this.profile?.userID,
        // @ts-ignore
        firstName: newFirstName,
        // @ts-ignore
        lastName: newLastName,
        // @ts-ignore
        phoneNumber: newPhoneNumber,
        // @ts-ignore
        email: this.profile?.email,
        // @ts-ignore
        accountStatus: newStatus,
        // @ts-ignore
        paymentAmount: this.profile?.paymentAmount,
        // @ts-ignore
        paymentDueDate: this.profile?.paymentDueDate
      };

      let gardenId;
      gardenId = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, gardenPlots);

      //TODO push do backendu
      //ustawic w dla profilu gardenID leasholderId na gardenID
      updateLeaseholderID(gardenId, this.id)
      this.profile = newUser;
      this.refresh1()
    }
  }

  refresh1() {
    window.location.reload();
  }

  getMatchingSectors(profiles: Profile[], gardenPlots: GardenPlot[]):
    ((string | null)[]) {
    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
      return (
        !profiles.some((profile) => profile.id === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID));
    });

    const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.sector);
    sectors.sort();
    return (sectors);
  }

  getMatchingAvenues(profiles: Profile[], gardenPlots: GardenPlot[], sector: string | null):
    ((string | null)[]) {
    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
      return (
        (!profiles.some((profile) => profile.id === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID)) && (gardenPlot.sector === sector));
    });

    const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.avenue);
    sectors.sort();
    return (sectors);
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

  goodAdressValidator(sector: string, avenue: string, gardenPlots: GardenPlot[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      let gardenID = findGardenPlotIdByAddress(sector, avenue, value, gardenPlots)
      let garden;
      if (gardenID) {
        garden = findGardenByUserID(this.id, gardenPlots)
        if (garden) {
          if (garden.id === gardenID) {
            return null
          }
        }
        return {goodAdress: true};
      }
      return null;
    };
  }

  protected readonly Object = Object;
  protected readonly Role_temp = Role_temp;
  protected readonly Role_temp2 = Role_temp2;
}

//TODO zmienic bo to jest tylko chwilowe
enum Role_temp2 {
  USER = 'UŻYTKOWNIK',
  GARDENER = 'Działkowiec',
  EMPLOYEE = 'PRACOWNIK',
}

export function updateLeaseholderID(targetID: string | null, newLeaseholderID: string | null) {
  //to zastapi push
  let garden;
  for (garden of gardenPlots) {
    if (garden.id === targetID) {
      garden.leaseholderID = newLeaseholderID
    }
  }
}

export function findGardenByUserID(id: string | null, gardenPlots: GardenPlot[]): GardenPlot | null {
  let garden: GardenPlot;
  for (garden of gardenPlots) {
    if (garden.leaseholderID === id) {
      return garden
    }
  }
  return null
}

