import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {VotingItem, VotingOption} from "../voting-item.model";
import {VotingsService} from "../votings.service";

@Component({
  selector: 'app-add-voting',
  templateUrl: './add-voting.component.html',
  styleUrls: ['./add-voting.component.scss']
})
export class AddVotingComponent {

  addVotingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVotingComponent>, private votingService: VotingsService) {
    this.addVotingForm = formBuilder.group({
      title: ['', [
        Validators.required,
      ]],
      description: [''],
      date: ['', [Validators.required, this.futureDateValidator()]],
      options: this.formBuilder.array([
        this.createOption(),
        this.createOption()
      ])
    });
    this.addVotingForm.updateValueAndValidity();
  }

  get options() {
    return this.addVotingForm.get('options') as FormArray;
  }

  addOption() {
    const options = this.addVotingForm.get('options') as FormArray;
    options.push(this.createOption());
  }

  removeOption(index: number): void {
    const options = this.addVotingForm.get('options') as FormArray;
    options.removeAt(index);
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      label: ['', Validators.required],
    });
  }

  addVoting() {
    if (this.addVotingForm.valid) {
      const options = this.addVotingForm.get('options') as FormArray;
      if (options.length < 2) {
        return;
      }

      for (let i = 0; i < options.length; i++) {
        const option = options.at(i) as FormGroup;
        if (!option.value.label) {
          return;
        }
      }

      const newTitle: string = this.addVotingForm.get('title')?.value;
      let newDescription: string | null = this.addVotingForm.get('title')?.value;
      let newDate: Date = this.addVotingForm.get('date')?.value;
      const uniqueId = 'voting-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);

      const optionsFormArray = this.addVotingForm.get('options') as FormArray;
      const options2: VotingOption[] = optionsFormArray.controls.map((control: AbstractControl) => {
        const label = control.get('label')?.value || '';
        const optionId = 'option-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
        const VotingOption: VotingOption = {optionId, label};
        return VotingOption
      });

console.log(options2)

      if (newDescription === null) {
        newDescription = "";
      }

      let voting: VotingItem = {
        id: uniqueId,
        title: newTitle,
        description: newDescription,
        finishDate: newDate,
        options: options2
      }
      this.votingService.addNewVoting(voting)
      this.addVotingForm.reset();
      this.closeAddingVoting(true)
    }
  }


  futureDateValidator() {
    return (control: { value: Date }) => {
      const currentDate = new Date();
      const inputDate = control.value;
      return inputDate > currentDate ? null : {notFuture: true};
    };
  }

  errorMessages = {
    title: [
      {type: 'required', message: 'Proszę podać nazwę głosowania'},
    ],
    date: [
      {type: 'required', message: 'Proszę podać date zakończenia głosowania'},
      {type: 'notFuture', message: 'Proszę podać date z przyszłości'},
    ],
  };

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.addVotingForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  closeAddingVoting(result?: boolean) {
    this.dialogRef.close(result);
  }
}
