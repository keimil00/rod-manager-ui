import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GardenPlot, PlotStatus} from "../garden-plot";

import {
  findProfileIdByEmail,
  getMatchingProfiles,
  profileEmailValidator,
  profiles
} from "../../list-of-users/ProfilesService";
import {gardenPlots, uniqueLeaseholderIDValidator} from "../GardenService";

// TODO walidacja adresu plus autocomplite na sektorach i alejach
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

