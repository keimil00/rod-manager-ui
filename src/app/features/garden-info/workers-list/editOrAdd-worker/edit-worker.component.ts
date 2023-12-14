import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employer} from "../../employer.model";
import {GardenInfoService} from "../../garden-info.service";

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent {
  workerForm: FormGroup;
  employer: Employer
  isToAdd: boolean

  constructor(formBuilder: FormBuilder, private gardenInfoService: GardenInfoService,
              public dialogRef: MatDialogRef<EditWorkerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employer: Employer, isToAdd: boolean }
  ) {
    this.employer = data.employer;
    this.isToAdd = data.isToAdd
    this.workerForm = formBuilder.group({
      position: ['', [
        Validators.required,
      ]],
      name: ['', [
        Validators.required,
      ]],
      phoneNumber: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
    });
  }

  ngOnInit() {
    this.populateFormFromEmployer(this.employer)
  }

  errorMessages = {
    position: [
      {type: 'required', message: 'Proszę podać stanowsiko'},
    ],
    name: [
      {type: 'required', message: 'Proszę podać imie i nazwisko'}
    ],
    phoneNumber: [
      {type: 'required', message: 'Proszę podać numer telefonu'}
    ],
    email: [
      {type: 'required', message: 'Proszę podać email'},
      {type: 'email', message: 'Proszę podać poprawny email'},
    ],
  };
  displayedColumns: string[] = ['position', 'name', 'phoneNumber', 'email', 'edit'];

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.workerForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  closeEditingingEmployer() {
    this.dialogRef.close();
  }

  populateFormFromEmployer(employer: Employer) {
    this.workerForm.patchValue({
      position: employer.position,
      name: employer.name,
      phoneNumber: employer.phoneNumber,
      email: employer.email,
    });
  }

  editWorker() {
    if (this.workerForm.valid) {
      const newPosition: string = this.workerForm.get('position')?.value;
      const newName: string = this.workerForm.get('name')?.value;
      const newNumber: string = this.workerForm.get('phoneNumber')?.value;
      const newEmail: string = this.workerForm.get('email')?.value;

      const uniqueId = new Date().getTime() + Math.floor(Math.random() * 1000);

      let newEmployer: Employer
      if (this.isToAdd) {
        newEmployer = {
          id: uniqueId,
          position: newPosition,
          name: newName,
          phoneNumber: newNumber,
          email: newEmail
        };
      } else {
        newEmployer = {
          id: this.employer.id,
          position: newPosition,
          name: newName,
          phoneNumber: newNumber,
          email: newEmail
        };
      }

      //TODO Push do backendu
      this.employer = newEmployer
      if (this.isToAdd) {
        this.gardenInfoService.addEmployer(newEmployer).subscribe()
      } else {
        this.gardenInfoService.updateEmployer(newEmployer).subscribe()
      }
      this.closeEditingingEmployer()
    }
  }
}

