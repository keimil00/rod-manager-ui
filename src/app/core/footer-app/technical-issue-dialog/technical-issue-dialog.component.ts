import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Fee} from "../../../features/payments/payments";
import {TechnicalIssueService} from "../technical-issue.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-technical-issue-dialog',
    templateUrl: './technical-issue-dialog.component.html',
    styleUrls: ['./technical-issue-dialog.component.scss']
})
export class TechnicalIssueDialogComponent {
    addTechnicalIsueForm: FormGroup;

    constructor(private technicalIsueService: TechnicalIssueService,
                private _snackBar: MatSnackBar,
                formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<TechnicalIssueDialogComponent>,
                private toastr: ToastrService
    ) {
        this.addTechnicalIsueForm = formBuilder.group({
                title: ['', [Validators.required]],
                description: ['', [Validators.required]],
            }
        );
    }

    validationErrors(controlName: string): any[] {
        let errors = []
        // @ts-ignore
        for (let error of this.errorMessages[controlName]) {
            if (this.addTechnicalIsueForm.get(controlName)?.hasError(error.type)) {
                errors.push(error);
            }
        }
        return errors;
    }

    private errorMessages = {
        title: [
            {type: 'required', message: 'Proszę podać tytuł'},
        ],
        description: [
            {type: 'required', message: 'Proszę podać opis problemu'},
        ],
    };

    addPayment() {
        if (this.addTechnicalIsueForm.valid) {
            const title: string = this.addTechnicalIsueForm.get('title')?.value;
            const description: string = this.addTechnicalIsueForm.get('description')?.value;

            this.technicalIsueService.sendIssue(title, description).subscribe((result: any) => {
              this.showSuccessMessage()
            });

            this.addTechnicalIsueForm.reset()
            this.closeDialog()
        }
    }

    private showSuccessMessage(): void {
        this.toastr.success('Pomyślnie dodano zgłoszenie', 'Sukces');
        // this._snackBar.open('Pomyślnie dodano zgłoszenie', 'Zamknij', {duration: 4000});
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
