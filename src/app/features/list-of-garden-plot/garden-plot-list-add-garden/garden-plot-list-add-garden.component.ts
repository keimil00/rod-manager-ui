import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GardenPlot, PlotStatus} from "../garden-plot";
import {Profile, Role_TEMP} from "../../Profile";
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {gardenPlots} from "../list-of-garden-plot.component";

@Component({
  selector: 'app-garden-plot-list-add-garden',
  templateUrl: './garden-plot-list-add-garden.component.html',
  styleUrls: ['./garden-plot-list-add-garden.component.scss']
})
export class GardenPlotListAddGardenComponent {
  leaseHolderOptions: { email: string; fullName: string }[] = [];

  @Output() closeAddingGardenPlot = new EventEmitter<void>();

  addGardenForm: FormGroup;
  showEmptyError: boolean = false;

  errorMessages = {
    sector: [
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    avenue: [
      {type: 'required', message: 'Proszę podać poprawną aleje'}
    ],
    number: [
      {type: 'required', message: 'Proszę podać poprawny numer'}
    ],
    area: [
      {type: 'required', message: 'Proszę podać obszar'},
      {type: 'min', message: 'Proszę podać poprawny obszar'}
    ],
    leaseholderEmail: [
      {type: 'invalidProfileEmail', message: 'Proszę wybrać poprawny profil'},
      {type: 'nonUniqueLeaseholderID', message: 'Profil jest już przypisany do innej działki'},
    ],
    status: [
      {type: 'required', message: 'Proszę podać status'}
    ]
  };

  constructor(formBuilder: FormBuilder) {
    this.addGardenForm = formBuilder.group({
      sector: ['', [
        Validators.required,
      ]],
      avenue: ['', [
        Validators.required,
      ]],
      number: ['', [
        Validators.required,
      ]],
      area: ['', [
        Validators.required,
        Validators.min(0.01),
      ]],
      leaseholderEmail: ['', [
        profileEmailValidator(profiles),
        uniqueLeaseholderIDValidator(gardenPlots, profiles, false)
      ]],
      status: ['',
        Validators.required]
    });
  }

  ngOnInit() {
    this.leaseHolderOptions = [{
      fullName: 'brak',
      email: 'brak'
    }, ...getMatchingProfiles(this.addGardenForm.get('leaseholderEmail')?.value, profiles, gardenPlots, false)];

    this.addGardenForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = [{
        fullName: 'brak',
        email: 'brak'
      }, ...getMatchingProfiles(value, profiles, gardenPlots, false)];
    });
    profiles.sort((a, b) => {

      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }

      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      }

      return a.email.localeCompare(b.email);
    });
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.addGardenForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  addNewGardenPlot() {
    if (this.addGardenForm.valid) {
      const newSector: string = this.addGardenForm.get('sector')?.value;
      const newAvenue: string = this.addGardenForm.get('avenue')?.value;
      const newNumber: number = this.addGardenForm.get('number')?.value;
      const newArea: number = this.addGardenForm.get('area')?.value;
      // const newLeaseholderEmail: string | null = this.leaseHolderControl.value
      const newLeaseholderEmail: string | null = this.addGardenForm.get('leaseholderEmail')?.value;
      const newStatus: PlotStatus = this.addGardenForm.get('status')?.value;

      let newLeaseholderID: string | null = null;

      const uniqueId = 'garden-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);

      if (newLeaseholderEmail === '' || newLeaseholderEmail === 'brak' || newLeaseholderEmail === null) {
        newLeaseholderID = null
      } else
        newLeaseholderID = findProfileIdByEmail(newLeaseholderEmail, profiles)

      const newGardenPlot: GardenPlot = {
        id: uniqueId,
        sector: newSector,
        avenue: newAvenue,
        number: newNumber,
        area: newArea,
        leaseholderID: newLeaseholderID,
        status: newStatus
      };

      //TODO push do backendu
      // this.gardenPlots?.push(newGardenPlot)

      this.showEmptyError = false
      this.addGardenForm.reset();
      this.closeAddingGardenPlot.emit()

    } else {
      this.showEmptyError = true;
    }
  }

  protected readonly PlotStatus = PlotStatus;
  protected readonly Object = Object;
}

function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.email === emailToFind);
  return foundProfile ? foundProfile.id : null;
}

export function profileEmailValidator(profiles: Profile[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const leaseHolder = control.value;

    if (!leaseHolder) {
      return null;
    }

    if(leaseHolder === 'brak'){
      return null;
    }

    const selectedProfile = profiles.find((profile) => profile.email === leaseHolder);

    if (!selectedProfile) {
      return {invalidProfileEmail: true};
    }

    return null;
  };
}

export function uniqueLeaseholderIDValidator(gardenPlots: GardenPlot[], profiles: Profile[], showCurrentLeaseHolder: boolean, CurrentGardenPlot?: GardenPlot): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const leaseholderEmail = control.value;

    if (!leaseholderEmail) {
      return null;
    }

    if(leaseholderEmail === 'brak'){
      return null;
    }

    const selectedProfile = profiles.find((profile) => profile.email === leaseholderEmail);

    if (!selectedProfile) {
      return null;
    }

    const isUsed = gardenPlots.some((plot) => plot.leaseholderID === selectedProfile.id);
    const isCurrent = (showCurrentLeaseHolder && CurrentGardenPlot?.leaseholderID === selectedProfile.id)

    if (isUsed && !isCurrent) {
      return {nonUniqueLeaseholderID: true};
    }

    return null;
  };
}

export function getMatchingProfiles(value: string, profiles: Profile[], gardenPlots: GardenPlot[], showCurrentLeaseHolder: boolean, currentGardernPlot?: GardenPlot): {
  email: string,
  fullName: string
}[] {
  const lowerCaseValue = value.toLowerCase();

  const availableProfiles = profiles.filter((profile) => {
    const fullName = profile.firstName + ' ' + profile.lastName
    return (
      (fullName.toLowerCase().includes(lowerCaseValue)||profile.email.toLowerCase().includes(lowerCaseValue)) && (
        !gardenPlots.some((plot) => plot.leaseholderID === profile.id) || (showCurrentLeaseHolder && currentGardernPlot?.leaseholderID === profile.id))
    );
  });

  return availableProfiles.map((profile) => ({
    email: profile.email,
    fullName: `${profile.firstName} ${profile.lastName}`
  }));
}

export let profiles: Profile[] = [
  {
    id: '1',
    userID: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    email: 'johndoe@example.com',
    plotID: '101',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 567,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '2',
    userID: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '987-654-3210',
    email: 'janesmith@example.com',
    plotID: '102',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 756,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '3',
    userID: 'user3',
    firstName: 'David',
    lastName: 'Johnson',
    phoneNumber: '555-555-5555',
    email: 'davidjohnson@example.com',
    plotID: '103',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 657,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '4',
    userID: 'user4',
    firstName: 'Mary',
    lastName: 'Williams',
    phoneNumber: '777-777-7777',
    email: 'marywilliams@example.com',
    plotID: '104',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 675,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '5',
    userID: 'user5',
    firstName: 'Robert',
    lastName: 'Brown',
    phoneNumber: '111-111-1111',
    email: 'robertbrown@example.com',
    plotID: '105',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 6765,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '6',
    userID: 'user6',
    firstName: 'Linda',
    lastName: 'Jones',
    phoneNumber: '222-222-2222',
    email: 'lindajones@example.com',
    plotID: '106',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 576,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '7',
    userID: 'user7',
    firstName: 'Michael',
    lastName: 'Davis',
    phoneNumber: '333-333-3333',
    email: 'michaeldavis@example.com',
    plotID: '107',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 57,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '8',
    userID: 'user8',
    firstName: 'Susan',
    lastName: 'Wilson',
    phoneNumber: '444-444-4444',
    email: 'susanwilson@example.com',
    plotID: '108',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 576,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '9',
    userID: 'user9',
    firstName: 'William',
    lastName: 'Evans',
    phoneNumber: '666-666-6666',
    email: 'williamevans@example.com',
    plotID: '109',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 6757,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '10',
    userID: 'user10',
    firstName: 'Karen',
    lastName: 'Taylor',
    phoneNumber: '999-999-9999',
    email: 'karentaylor@example.com',
    plotID: '110',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 876,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '11',
    userID: 'user11',
    firstName: 'Richard',
    lastName: 'Anderson',
    phoneNumber: '222-222-2222',
    email: 'richardanderson@example.com',
    plotID: '111',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 1654,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '12',
    userID: 'user12',
    firstName: 'Patricia',
    lastName: 'White',
    phoneNumber: '333-333-3333',
    email: 'patriciawhite@example.com',
    plotID: '112',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 6785,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '13',
    userID: 'user13',
    firstName: 'David',
    lastName: 'Thomas',
    phoneNumber: '777-777-7777',
    email: 'davidthomas@example.com',
    plotID: '113',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 456,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '14',
    userID: 'user14',
    firstName: 'Susan',
    lastName: 'Jackson',
    phoneNumber: '123-123-1234',
    email: 'susanjackson@example.com',
    plotID: '114',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 8658,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '15',
    userID: 'user15',
    firstName: 'Michael',
    lastName: 'Harris',
    phoneNumber: '456-456-4567',
    email: 'michaelharris@example.com',
    plotID: '115',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 654,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '16',
    userID: 'user16',
    firstName: 'Karen',
    lastName: 'Martin',
    phoneNumber: '111-111-1111',
    email: 'karenmartin@example.com',
    plotID: '116',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 6546,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '17',
    userID: 'user17',
    firstName: 'William',
    lastName: 'Garcia',
    phoneNumber: '555-555-5555',
    email: 'williamgarcia@example.com',
    plotID: '117',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 453,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    id: '18',
    userID: 'user18',
    firstName: 'Linda',
    lastName: 'Brown',
    phoneNumber: '333-333-3333',
    email: 'lindabrown@example.com',
    plotID: '118',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 5345,
    paymentDueDate: new Date(2024, 10, 31),
  },
  {
    id: '19',
    userID: 'user19',
    firstName: 'Michael',
    lastName: 'Lewis',
    phoneNumber: '777-777-7777',
    email: 'michaellewis@example.com',
    plotID: '119',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 7680,
    paymentDueDate: new Date(2023, 12, 31),
  },
  {
    id: '20',
    userID: 'user20',
    firstName: 'Susan',
    lastName: 'Clark',
    phoneNumber: '123-123-1234',
    email: 'susanclark@example.com',
    plotID: '120',
    accountStatus: Role_TEMP.GARDENER,
    paymentAmount: 340,
    paymentDueDate: new Date(2023, 10, 31),
  },
];
