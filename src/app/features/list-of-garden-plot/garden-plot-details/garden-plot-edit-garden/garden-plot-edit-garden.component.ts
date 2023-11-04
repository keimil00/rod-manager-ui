import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GardenPlot, PlotStatus} from "../../garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {gardenPlots} from "../../list-of-garden-plot.component";
import {Profile} from "../../../Profile";
import {
  getMatchingProfiles,
  profileEmailValidator,
  profiles,
  uniqueLeaseholderIDValidator
} from "../../garden-plot-list-add-garden/garden-plot-list-add-garden.component";

@Component({
  selector: 'app-garden-plot-edit-garden',
  templateUrl: './garden-plot-edit-garden.component.html',
  styleUrls: ['./garden-plot-edit-garden.component.scss']
})
export class GardenPlotEditGardenComponent {
  @Input() gardenPlot: GardenPlot | undefined;
  @Output() closeEditingingGardenPlot = new EventEmitter<void>();

  leaseHolderOptions: { email: string; fullName: string }[] = [];

  editGardenForm: FormGroup;
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
    this.editGardenForm = formBuilder.group({
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
        uniqueLeaseholderIDValidator(gardenPlots, profiles,true,this.gardenPlot)
      ]],
      status: ['',
        Validators.required]
    });
  }

  populateFormFromGardenPlot(gardenPlot: GardenPlot) {
    this.editGardenForm.patchValue({
      sector: gardenPlot.sector,
      avenue: gardenPlot.avenue,
      number: gardenPlot.number,
      area: gardenPlot.area,
      leaseholderEmail: gardenPlot.leaseholderID!==null ? findProfileEmailByID(gardenPlot.leaseholderID, profiles):'brak',
      status: gardenPlot.status,
    });
  }

  ngOnInit(formBuilder: FormBuilder) {
    // @ts-ignore
    const gardenPlot: GardenPlot = this.gardenPlot
    this.populateFormFromGardenPlot(gardenPlot);

    this.leaseHolderOptions = [{
      fullName: 'brak',
      email: 'brak'
    }, ...getMatchingProfiles(this.editGardenForm.get('leaseholderEmail')?.value, profiles, gardenPlots, true,gardenPlot)];

    this.editGardenForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = [{
        fullName: 'brak',
        email: 'brak'
      }, ...getMatchingProfiles(value, profiles, gardenPlots, true,gardenPlot)];
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
    this.editGardenForm.get('leaseholderEmail')?.addValidators(uniqueLeaseholderIDValidator(gardenPlots, profiles, true, gardenPlot));
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.editGardenForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  editGardenPlot() {
    if (this.editGardenForm.valid) {
      const newSector: string = this.editGardenForm.get('sector')?.value;
      const newAvenue: string = this.editGardenForm.get('avenue')?.value;
      const newNumber: number = this.editGardenForm.get('number')?.value;
      const newArea: number = this.editGardenForm.get('area')?.value;
      const newLeaseholderEmail: string | null = this.editGardenForm.get('leaseholderEmail')?.value;
      const newStatus: PlotStatus = this.editGardenForm.get('status')?.value;

      let newLeaseholderID: string | null = null;

      if (newLeaseholderEmail === '' || newLeaseholderEmail === null) {
        newLeaseholderID = null
      } else
        newLeaseholderID = findProfileIdByEmail(newLeaseholderEmail, profiles)

      // @ts-ignore
      this.gardenPlot.sector = newSector,
        // @ts-ignore
        this.gardenPlot.avenue = newAvenue,
        // @ts-ignore
        this.gardenPlot.number = newNumber,
        // @ts-ignore
        this.gardenPlot.area = newArea,
        // @ts-ignore
        this.gardenPlot.leaseholderID = newLeaseholderID,
        // @ts-ignore
        this.gardenPlot.status = newStatus

      //TODO push do backendu

      this.showEmptyError = false
      this.editGardenForm.reset();
      this.closeEditingingGardenPlot.emit()

    } else this.showEmptyError = true
  }

  protected readonly Object = Object;
  protected readonly PlotStatus = PlotStatus;
}

function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.email === emailToFind);
  return foundProfile ? foundProfile.id : null;
}

function findProfileEmailByID(IdToFind: string | null, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.id === IdToFind);
  return foundProfile ? foundProfile.email : null;
}

