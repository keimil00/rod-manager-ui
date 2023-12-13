import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {AuthService} from "../../core/auth/auth.service";
import {StorageService} from "../../core/storage/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getCountries, getCountryCallingCode} from "libphonenumber-js";
import {NgxSpinnerService} from "ngx-spinner";
import {ForgetPasswordService} from "../forget-password/forget-password.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  token: string = ''

  errorMessages = {
    password: [
      {type: 'required', message: 'Hasło jest wymagane'},
      {type: 'minlength', message: 'Hasło musi mieć co najmniej 8 znaków'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Potwierdzenie hasła jest wymagane'},
      {type: 'passwordMismatch', message: 'Hasła nie są identyczne'}
    ]
  };

  resetPasswordFrom: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private forgetPasswordService: ForgetPasswordService,
    private _snackBar: MatSnackBar,
    private router: Router,
    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
    this.resetPasswordFrom = formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token= params['token']
    });
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.resetPasswordFrom.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordToConfirm = control.value;
      const originalPassword = control.parent ? control.parent.get('password')?.value : null;

      if (!passwordToConfirm || !originalPassword) {
        return null; // If the control or country code is empty, consider it valid.
      }

      try {
        if (passwordToConfirm !== originalPassword) {
          return {passwordMismatch: true};
        }
      } catch (error) {
        return {passwordMismatch: true};
      }

      return null;
    };
  }

  navigate() {
    this.router.navigate(['login']);
  }

  confirm() {
    if (this.resetPasswordFrom.valid) {
      const newPassword: string = this.resetPasswordFrom.get('password')?.value
      this.spinner.show()
      this.forgetPasswordService.resetPassword(this.token,newPassword).subscribe({
        next: data => {
          this.showSuccessMessage()
          this.spinner.hide()
          this.navigate()
        },
        error: error => {
          this.showErrorMessage()
          this.spinner.hide()
        }
      })
    }
  }

  private showSuccessMessage(): void {
    this.toastr.success('Pomyślnie zmieniono hasło', 'Sukces');
    // this._snackBar.open('Pomyślnie zmieniono hasło', 'Zamknij', {duration: 4000});
  }

  private showErrorMessage(): void {
    this.toastr.error('Token niepoprawny / stracił ważność', 'Błąd');
    // this._snackBar.open('Token niepoprawny / stracił ważność', 'Zamknij', {duration: 4000});
  }
}
