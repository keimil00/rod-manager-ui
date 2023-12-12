import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GardenPlot, GardenPlotWithLeaseholder, PlotStatus} from "../garden-plot";

import {
  findProfileIdByEmail,
  getMatchingProfiles,
  profileEmailValidator,
} from "../../list-of-users/ProfilesService";
import {
  getMatchingAvenues,
  getMatchingSectors,
  uniqueGardenValidator,
  uniqueLeaseholderIDValidator
} from "../GardenService";
import {MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";
import {ListOfUsersService} from "../../list-of-users/list-of-users.service";
import {Profile} from "../../Profile";
import {forkJoin} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-garden-plot-list-add-garden',
  templateUrl: './garden-plot-list-add-garden.component.html',
  styleUrls: ['./garden-plot-list-add-garden.component.scss']
})
export class GardenPlotListAddGardenComponent {
  leaseHolderOptions: { email: string; fullName: string }[] = [];
  sectorsOptions: (string | null)[] = [];
  avenuesOptions: (string | null)[] = [];

  // @ts-ignore
  private profiles: Profile[]
  // @ts-ignore
  private gardenPlots: GardenPlot[]

  closeAddingGardenPlot() {
    this.dialogRef.close();
  }

  // @ts-ignore
  addGardenForm: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GardenPlotListAddGardenComponent>,
    private gardenPlotsDataService: BackendGardenService,
    private listOfUsersService: ListOfUsersService,
    private toastr: ToastrService,
  ) {
    this.addGardenForm = this.formBuilder.group({
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
        // @ts-ignore
        profileEmailValidator(this.profiles),
        // @ts-ignore
        uniqueLeaseholderIDValidator(this.gardenPlots, this.profiles, false)
      ]],
      status: ['',
        Validators.required]
    });
    this.loadData()
    // this.addGardenForm.updateValueAndValidity();
  }

  loadData() {
    forkJoin({
      profiles: this.listOfUsersService.getAllProfiles(),
      gardenPlots: this.gardenPlotsDataService.getAllGardenPlots(),
    }).subscribe({
      next: data => {
        this.profiles = data.profiles
        this.gardenPlots = data.gardenPlots

        this.initData()
      }, error: err => {
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }


  initData() {
    this.addGardenForm = this.formBuilder.group({
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
        // @ts-ignore
        profileEmailValidator(this.profiles),
        // @ts-ignore
        uniqueLeaseholderIDValidator(this.gardenPlots, this.profiles, false)
      ]],
      status: ['',
        Validators.required]
    });


    this.leaseHolderOptions = [{
      fullName: 'brak',
      email: 'brak'
    }, ...getMatchingProfiles(this.addGardenForm.get('leaseholderEmail')?.value, this.profiles, this.gardenPlots, false)];

    this.addGardenForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = [{
        fullName: 'brak',
        email: 'brak'
      }, ...getMatchingProfiles(value, this.profiles, this.gardenPlots, false)];
    });

    this.sectorsOptions = getMatchingSectors(this.addGardenForm.get('sector')?.value, this.gardenPlots);
    this.addGardenForm.get('sector')?.valueChanges.subscribe((value) => {
      this.sectorsOptions = getMatchingSectors(this.addGardenForm.get('sector')?.value, this.gardenPlots);
      this.updateAvenousAndNumberValidator()
    });

    this.avenuesOptions = getMatchingAvenues(this.addGardenForm.get('avenue')?.value, this.addGardenForm.get('sector')?.value, this.gardenPlots);
    this.addGardenForm.get('avenue')?.valueChanges.subscribe((value) => {
      this.updateAvenousAndNumberValidator()
    });
  }

  updateAvenousAndNumberValidator() {
    this.avenuesOptions = getMatchingAvenues(this.addGardenForm.get('avenue')?.value, this.addGardenForm.get('sector')?.value, this.gardenPlots);
    this.addGardenForm.get('number')?.setValidators([Validators.required, uniqueGardenValidator(this.addGardenForm.get('sector')?.value, this.addGardenForm.get('avenue')?.value, this.gardenPlots, false)])
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

      let newLeaseholderID: number | null = null;

      const uniqueId: number = new Date().getTime() + Math.floor(Math.random() * 1000);

      if (newLeaseholderEmail === '' || newLeaseholderEmail === 'brak' || newLeaseholderEmail === null) {
        newLeaseholderID = null
      } else
        newLeaseholderID = findProfileIdByEmail(newLeaseholderEmail, this.profiles)

      const newGardenPlot: GardenPlot = {
        gardenPlotID: uniqueId,
        sector: newSector,
        avenue: newAvenue,
        number: newNumber,
        area: newArea,
        leaseholderID: newLeaseholderID,
        exleaseholderID: null,
        gardenStatus: newStatus
      };

      this.gardenPlotsDataService.addGarden(newGardenPlot).subscribe({
        error: err => {
          this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
        }
      })

      this.addGardenForm.reset();
      this.closeAddingGardenPlot()

    } else {
    }
  }

  protected readonly PlotStatus = PlotStatus;
  protected readonly Object = Object;
}

