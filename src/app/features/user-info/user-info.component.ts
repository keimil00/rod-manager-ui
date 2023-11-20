import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile, Role_TEMP} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../register/user.model";
import {
  findGardenByID,
  findGardenByUserID,
  findGardenPlotIdByAddress,
  gardenPlots,
  updateLeaseholderID
} from "../list-of-garden-plot/GardenService";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {UserInfoService} from "./user-info.service";

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

  // @ts-ignore
  profiles:Profile[];

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private router: Router ,private listOfUsersService: ListOfUsersService, private userInfoService:UserInfoService) {
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

  initData(){
    this.profiles = this.listOfUsersService.getAllProfiles()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.profile = this.getProfileById(this.id)
    });

    if (findGardenByUserID(this.id, gardenPlots)) {
      this.showGardenAddress = true
    }

    this.sectorsOptions = this.getMatchingSectors(this.profiles, gardenPlots);

    this.userInfoForm.get('plotSector')?.valueChanges.subscribe((value) => {
      this.avenuesOptions = this.getMatchingAvenues(this.profiles, gardenPlots, this.userInfoForm.get('plotSector')?.value)
      this.numbersOptions = []
    });

    this.userInfoForm.get('plotAvenue')?.valueChanges.subscribe((value) => {
      this.numbersOptions = this.getMatchingNumbers(this.profiles, gardenPlots, this.userInfoForm.get('plotSector')?.value, this.userInfoForm.get('plotAvenue')?.value)
    });
    this.populateFormFromGardenPlot(this.profile);
  }

  populateFormFromGardenPlot(profile: Profile | undefined) {
    const address = this.findPlotAddressTupleByUserId(gardenPlots, profile?.profileId);
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
    return this.userInfoService.getProfileById(id)
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
      (this.profile?.accountStatus.some((status) => status === Role_TEMP.ADMIN)) ||
      (this.profile?.accountStatus.some((status) => status === Role_TEMP.MANAGER))
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

    this.userInfoForm.get('plotSector')?.setValidators([])
    this.userInfoForm.get('plotAvenue')?.setValidators([])
    this.userInfoForm.get('plotNumber')?.setValidators([])

    this.userInfoForm.get('email')?.disable();
    this.userInfoForm.updateValueAndValidity();
    this.showUserEdit = false
  }

  disableFormFields() {
    if (findGardenByUserID(this.id, gardenPlots)) {
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

    let gardenID = findGardenPlotIdByAddress(newSector, newAvenue, newNumber, gardenPlots)
    let garden;
    if (gardenID) {
      garden = findGardenByID(gardenID, gardenPlots)
      if (garden) {
        goodAdress = true
      }
    }

    if (newSector === null || newSector === undefined)
      goodAdress = true

    if (this.userInfoForm.valid && goodAdress) {
      const newFirstName: number = this.userInfoForm.get('firstName')?.value;
      const newLastName: number = this.userInfoForm.get('lastName')?.value;
      const newPhoneNumber: number = this.userInfoForm.get('phoneNumber')?.value;

      let newStatus: Role_TEMP[] = this.userInfoForm.get('accountStatus')?.value;


      const newUser: Profile = {
        // @ts-ignore
        profileId: this.id,
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
      // this.profile = newUser;
      // let idToNull = findGardenByUserID(this.id, gardenPlots)?.id
      // updateLeaseholderID(idToNull, null)
      // updateLeaseholderID(gardenID, this.id)

      if (newSector !== null) {
        let idToNull = findGardenByUserID(this.id, gardenPlots)?.gardenPlotID
        updateLeaseholderID(idToNull, null)
        updateLeaseholderID(gardenID, this.id)
      }
      this.profile = newUser;
      this.disableFormFields()
    }
  }

  getMatchingSectors(profiles: Profile[], gardenPlots: GardenPlot[]):
    ((string | null)[]) {
    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
      return (
        !profiles.some((profile) => profile.profileId === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID));
    });

    const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.sector);
    sectors.sort();
    return (sectors);
  }

  getMatchingAvenues(profiles: Profile[], gardenPlots: GardenPlot[], sector: string | null):
    ((string | null)[]) {
    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
      return (
        (!profiles.some((profile) => profile.profileId === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID)) && (gardenPlot.sector === sector));
    });

    const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.avenue);
    sectors.sort();
    return (sectors);
  }

  getMatchingNumbers(profiles: Profile[], gardenPlots: GardenPlot[], sector: string | null, avenue: string | null,):
    ((number | null)[]) {
    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
      return (
        (!profiles.some((profile) => profile.profileId === gardenPlot.leaseholderID) || (this.id === gardenPlot.leaseholderID)) && (gardenPlot.sector === sector) && (gardenPlot.avenue === avenue));
    });

    const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.number);
    sectors.sort();
    return (sectors);
  }

  protected readonly Object = Object;
  protected readonly Role_temp = Role_TEMP;
  protected readonly Role_temp2 = Role_temp2;
}

//TODO zmienic bo to jest tylko chwilowe
enum Role_temp2 {
  USER = 'UŻYTKOWNIK',
  GARDENER = 'Działkowiec',
  EMPLOYEE = 'PRACOWNIK',
}
