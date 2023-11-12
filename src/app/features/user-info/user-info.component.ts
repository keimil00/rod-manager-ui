import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile, Role_temp} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../register/user.model";
import {
  findGardenByUserID,
  findGardenPlotIdByAddress,
  gardenPlots,
  updateLeaseholderID
} from "../list-of-garden-plot/GardenService";
import {profiles} from "../list-of-users/ProfilesService";

//TODO naprawic sytuacje jak uzytkownik ma nie miec dzialki
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

  isAdmin = false
  isManager = false

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

    if (this.profile?.accountStatus.some((status) => status === Role_temp.ADMIN)) {
      this.isAdmin = true
    }
    if (this.profile?.accountStatus.some((status) => status === Role_temp.MANAGER)) {
      this.isManager = true
    }

    Object.keys(this.userInfoForm.controls).forEach(controlName => {
      const control = this.userInfoForm.get(controlName);
      if (control) {
        control.enable();
        control.setValidators([Validators.required]); // Ustawienie walidatora Validators.required
        control.updateValueAndValidity(); // Aktualizacja walidatora
      }
    });

    // Przekazywanie wartości pól, nie wywoływanie funkcji
    this.userInfoForm.get('plotSector')?.setValidators([])
    this.userInfoForm.get('plotAvenue')?.setValidators([])
    this.userInfoForm.get('plotNumber')?.setValidators([])

    this.userInfoForm.get('email')?.disable();
    this.userInfoForm.updateValueAndValidity();
    this.showUserEdit = false
  }

  editProfile() {
    const newSector: string = this.userInfoForm.get('plotSector')?.value;
    const newAvenue: string = this.userInfoForm.get('plotAvenue')?.value;
    const newNumber: number = this.userInfoForm.get('plotNumber')?.value;
    let goodAdress: boolean = false

    let gardenID = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, gardenPlots)
    let garden;
    if (gardenID) {
      garden = findGardenByUserID(gardenID, gardenPlots)
      if (garden) {
        goodAdress = true
      }
    }

    if (newSector === null)
      goodAdress = true

    if (this.userInfoForm.valid && goodAdress) {
      const newFirstName: number = this.userInfoForm.get('firstName')?.value;
      const newLastName: number = this.userInfoForm.get('lastName')?.value;
      const newPhoneNumber: number = this.userInfoForm.get('phoneNumber')?.value;

      let newStatus: Role_temp[] = this.userInfoForm.get('accountStatus')?.value;

      if (this.isManager && !newStatus.includes(Role_temp.MANAGER)) {
        newStatus.push(Role_temp.MANAGER);
      }
      if (this.isAdmin && !newStatus.includes(Role_temp.ADMIN)) {
        newStatus.push(Role_temp.ADMIN);
      }

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

      //TODO push do backendu
      //ustawic w dla profilu gardenID leasholderId na gardenID
      if (newSector !== null) {
        updateLeaseholderID(gardenID, this.id,gardenPlots)
        let idToNull = findGardenByUserID(this.id,gardenPlots)?.id
        updateLeaseholderID(idToNull, null,gardenPlots)
      }
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

  // goodAdressValidator(sector: string, avenue: string, gardenPlots: GardenPlot[]): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const value = control.value;
  //
  //     if (!value) {
  //       return null;
  //     }
  //
  //     let gardenID = findGardenPlotIdByAddress(sector, avenue, value, gardenPlots)
  //     let garden;
  //     if (gardenID) {
  //       garden = findGardenByUserID(this.id, gardenPlots)
  //       if (garden) {
  //         if (garden.id === gardenID) {
  //           return null
  //         }
  //       }
  //       return {goodAdress: true};
  //     }
  //     return null;
  //   };
  // }

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

