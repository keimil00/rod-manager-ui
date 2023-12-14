import {Component} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ForgetPasswordService} from "./forget-password.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";
import {config} from "rxjs";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  emailForm: FormGroup;
  errorMessages = {
    email: [
      {type: 'required', message: 'Email jest wymagany'},
      {type: 'email', message: 'Proszę wprowadzić poprawny email'}
    ],
  };

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private forgetPasswordService: ForgetPasswordService,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
    this.router = router;
    this.emailForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  navigate() {
    this.router.navigate(['home']);
  }

  confirm() {
    if (this.emailForm.valid) {
      const email: string = this.emailForm.get('email')?.value
      this.spinner.show()
      this.forgetPasswordService.sendEmail(email).subscribe({
        next: data => {
          this.showSuccessMessage()
          this.navigate()
          this.spinner.hide()
        },
        error: error => {
          this.showErrorMessage()
          this.spinner.hide()
        }
      })
    }
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.emailForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  private showSuccessMessage(): void {
    this.toastr.info('Na twoją skrzynke email została wysłana wiadomość', 'Sukces',);
    // this._snackBar.open('Na twoją skrzynke email została wysłana wiadomość', 'Zamknij', {duration: 8000});
  }

  private showErrorMessage(): void {
    this.toastr.error('Nie istnieje konto z takim adresem email', 'Błąd',);
    // this._snackBar.open('Nie istnieje konto z takim adresem email', 'Zamknij', {duration: 4000});
  }
}
