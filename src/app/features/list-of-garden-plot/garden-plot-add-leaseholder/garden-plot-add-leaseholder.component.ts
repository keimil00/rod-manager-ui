import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GardenPlot} from "../garden-plot";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  getMatchingProfiles,
  profileEmailValidator,
  profiles, uniqueLeaseholderIDValidator
} from "../garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {gardenPlots} from "../list-of-garden-plot.component";
import {Profile} from "../../Profile";

@Component({
  selector: 'app-garden-plot-add-leaseholder',
  templateUrl: './garden-plot-add-leaseholder.component.html',
  styleUrls: ['./garden-plot-add-leaseholder.component.scss']
})
export class GardenPlotAddLeaseholderComponent implements OnInit {
  leaseHolderOptions: { email: string; fullName: string }[] = [];

  showError: boolean = false;

  @Input() gardenPlot: GardenPlot | undefined;
  @Output() closeAddingLeaseHolder = new EventEmitter<void>();

  addLeaseHolderForm: FormGroup;

  populateFormFromGardenPlot(gardenPlot: GardenPlot | undefined) {
    this.addLeaseHolderForm.patchValue({
      // @ts-ignore
      leaseholderEmail: gardenPlot.leaseholderID!==null ? findProfileEmailByID(gardenPlot.leaseholderID, profiles):'brak',
    });
  }

  constructor(formBuilder: FormBuilder) {
    this.addLeaseHolderForm = formBuilder.group({
      leaseholderEmail: ['', [
        profileEmailValidator(profiles),
        uniqueLeaseholderIDValidator(gardenPlots, profiles,true,this.gardenPlot)
      ]],
    });
  }

  ngOnInit() {
    this.leaseHolderOptions = [{
      fullName: 'brak',
      email: 'brak'
    }, ...getMatchingProfiles(this.addLeaseHolderForm.get('leaseholderEmail')?.value, profiles, gardenPlots, true,this.gardenPlot)];

    this.addLeaseHolderForm.get('leaseholderEmail')?.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = [{
        fullName: 'brak',
        email: 'brak'
      }, ...getMatchingProfiles(value, profiles, gardenPlots, true,this.gardenPlot)];
    });

    this.populateFormFromGardenPlot(this.gardenPlot);

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

  accept() {
    if (this.addLeaseHolderForm.get('leaseholderEmail')?.value) {
      if (this.addLeaseHolderForm.get('leaseholderEmail')?.value === 'brak') {
        // @ts-ignore
        this.gardenPlot.leaseholderID = null;
        this.closeAddingLeaseHolder.emit();
      } else {
        const selectedProfile = profiles.find((profile) => {
          return profile.email === this.addLeaseHolderForm.get('leaseholderEmail')?.value;
        });

        if (selectedProfile) {
          // @ts-ignore
          this.gardenPlot.leaseholderID = selectedProfile.id;
          this.closeAddingLeaseHolder.emit();
        }
      }
    } else {
      this.showError = true;
    }
  }


  errorMessages = {
    leaseholderEmail: [
      {type: 'invalidProfileEmail', message: 'Proszę wybrać poprawny profil'},
      {type: 'nonUniqueLeaseholderID', message: 'Profil jest już przypisany do innej działki'},
    ],
  };

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.addLeaseHolderForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }
}

function findProfileEmailByID(IdToFind: string | null, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.id === IdToFind);
  return foundProfile ? foundProfile.email : null;
}
