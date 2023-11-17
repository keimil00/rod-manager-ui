import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GardenPlot, GardenPlotBackend, PlotStatus} from "../../garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Profile} from "../../../Profile";
import {
  findProfileEmailByID,
  gardenPlots,
  getAvenues,
  getSectors,
  uniqueGardenValidator,
  uniqueLeaseholderIDValidator
} from "../../GardenService";

import {getMatchingProfiles, profileEmailValidator, profiles} from "../../../list-of-users/ProfilesService";
import {BackendGardenService} from "../../backend-garden.service";

@Component({
  selector: 'app-garden-plot-edit-garden',
  templateUrl: './garden-plot-edit-garden.component.html',
  styleUrls: ['./garden-plot-edit-garden.component.scss']
})
export class GardenPlotEditGardenComponent implements OnInit{
  @Input() gardenPlot: GardenPlotBackend | undefined;
  @Output() closeEditingingGardenPlot = new EventEmitter<void>();

  leaseHolderOptions: { email: string; fullName: string }[] = [];

  editGardenForm: FormGroup;

  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];
  // @ts-ignore
  leasholderID :string|null

  errorMessages = {
    sector: [
      {type: 'required', message: 'Proszę podać sektor'},
    ],
    avenue: [
      {type: 'required', message: 'Proszę podać poprawną aleje'}
    ],
    number: [
      {type: 'required', message: 'Proszę podać poprawny numer'},
      {type: 'nonUniqueGarden', message: 'Istnieje już działka z tym adresem'}
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

  constructor(formBuilder: FormBuilder, private gardenPlotsDataService: BackendGardenService) {
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
        // uniqueLeaseholderIDValidator(gardenPlots, profiles,true,this.gardenPlot)
      ]],
      status: ['',
        Validators.required]
    });
  }

  populateFormFromGardenPlot(gardenPlot: GardenPlotBackend) {
    this.editGardenForm.patchValue({
      sector: gardenPlot.sector,
      avenue: gardenPlot.avenue,
      number: gardenPlot.number,
      area: gardenPlot.area,
      leaseholderEmail: gardenPlot.leaseholder!==null ? findProfileEmailByID(this.leasholderID, profiles):'brak',
      status: gardenPlot.gardenStatus,
    });
  }

  ngOnInit() {
    // @ts-ignore
    const gardenPlot: GardenPlotBackend = this.gardenPlot
    const leaseholder = this.gardenPlotsDataService.getLeaseholder(this.gardenPlot?.gardenPlotID,gardenPlots)
    if(leaseholder){
      this.leasholderID=leaseholder.profileId
    }
    else this.leasholderID = null
    this.populateFormFromGardenPlot(gardenPlot);

    this.leaseHolderOptions = [{
      fullName: 'brak',
      email: 'brak'
    }, ...getMatchingProfiles(this.editGardenForm.get('leaseholderEmail')?.value, profiles, gardenPlots, true,this.leasholderID)];

    this.editGardenForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = [{
        fullName: 'brak',
        email: 'brak'
      }, ...getMatchingProfiles(value, profiles, gardenPlots, true,this.leasholderID)];
    });

    this.sectorsOptions = getSectors(this.editGardenForm.get('sector')?.value, gardenPlots);
    this.editGardenForm.get('sector')?.valueChanges.subscribe((value) => {
      this.sectorsOptions = getSectors(this.editGardenForm.get('sector')?.value, gardenPlots);
      this.updateAvenousAndNumberValidator()
    });

    this.avenuesOptions = getAvenues(this.editGardenForm.get('avenue')?.value, this.editGardenForm.get('sector')?.value, gardenPlots);
    this.editGardenForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.updateAvenousAndNumberValidator()
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
    this.editGardenForm.get('leaseholderEmail')?.setValidators(uniqueLeaseholderIDValidator(gardenPlots, profiles, true, this.leasholderID));
  }

  updateAvenousAndNumberValidator() {
    this.avenuesOptions = getAvenues(this.editGardenForm.get('avenue')?.value, this.editGardenForm.get('sector')?.value, gardenPlots);
    this.editGardenForm.get('number')?.setValidators([Validators.required, uniqueGardenValidator(this.editGardenForm.get('sector')?.value, this.editGardenForm.get('avenue')?.value, gardenPlots,true,this.leasholderID)])
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
        this.gardenPlot.leaseholder = newLeaseholderID,
        // @ts-ignore
        this.gardenPlot.status = newStatus

      let newGarden = this.gardenPlot
      let newGarden2 :GardenPlot ={
        // @ts-ignore
        gardenPlotID:newGarden?.gardenPlotID,
        // @ts-ignore
        leaseholderID:newLeaseholderID,
        // @ts-ignore
        sector : newGarden?.sector,
        // @ts-ignore
        avenue : newGarden?.avenue,
        // @ts-ignore
        number : newGarden?.number,
        // @ts-ignore
        area : newGarden?.area,
        // @ts-ignore
        gardenStatus : newGarden?.gardenStatus
      }
      //TODO push do backendu newGarden

      this.gardenPlotsDataService.editGarden(this.gardenPlot?.gardenPlotID,newGarden)
      this.gardenPlotsDataService.editGarden2(this.gardenPlot?.gardenPlotID,newGarden2,gardenPlots)
      // this.gardenPlotsDataService.editGarden3(this.gardenPlot?.id,newGarden2)

      this.editGardenForm.reset();
      this.closeEditingingGardenPlot.emit()
    }
  }
  protected readonly Object = Object;
  protected readonly PlotStatus = PlotStatus;
}

function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.email === emailToFind);
  return foundProfile ? foundProfile.profileId : null;
}

