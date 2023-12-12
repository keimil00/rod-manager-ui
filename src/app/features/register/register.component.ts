import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {
  AsYouType,
  parsePhoneNumber,
  getCountries,
  getCountryCallingCode,
  getPhoneCode,
  CountryCode
} from "libphonenumber-js";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {AuthService} from "../../core/auth/auth.service";
import {LoginUser, User} from "./user.model";
import {StorageService} from "../../core/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  protected readonly getCountries = getCountries;
  protected readonly getCountryCallingCode = getCountryCallingCode;
  protected readonly getPhoneCode = getPhoneCode;
  registerFrom: FormGroup;

  errorMessages = {
    firstName: [
      {type: 'required', message: 'Imię jest wymagane'}
    ],
    lastName: [
      {type: 'required', message: 'Nazwisko jest wymagane'}
    ],
    email: [
      {type: 'required', message: 'Adres e-mail jest wymagany'},
      {type: 'email', message: 'Proszę podać prawidłowy adres e-mail'},
      {type: 'emailExists', message: 'Email jest już zajęty'}
    ],
    phoneNumber: [
      {type: 'pattern', message: 'Proszę podać prawidłowy numer telefonu (9 cyfr)'}
    ],
    password: [
      {type: 'required', message: 'Hasło jest wymagane'},
      {type: 'minlength', message: 'Hasło musi mieć co najmniej 8 znaków'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Potwierdzenie hasła jest wymagane'},
      {type: 'passwordMismatch', message: 'Hasła nie są identyczne'}
    ]
  };


  constructor(private socialAuthService: SocialAuthService,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router,
              formBuilder: FormBuilder) {
    this.socialAuthService = socialAuthService;
    this.authService = authService;
    this.storageService = storageService;
    this.router = router;
    this.registerFrom = formBuilder.group({
      firstName: ['', Validators.required, Validators.maxLength(30)],
      lastName: ['', Validators.required, Validators.maxLength(30)],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['PL'],
      phoneNumber: ['', this.phoneNumberValidator()],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log('Register User: ' + JSON.stringify(user));
      this.authService.loginGoogle(user.idToken).pipe().subscribe({
        next: data => {
          console.log(data);
          this.storageService.setTokens(data.access, data.refresh);
          this.storageService.setRoles(data.roles);
          this.router.navigate(['home'])
        },
        error: error => {
          console.error(error);
        }
      });
    });
  }

  register(): void {
    console.log('Register');
    console.log(this.registerFrom.value);
    let user = new User();
    user.email = this.registerFrom.get('email')?.value;
    user.password = this.registerFrom.get('password')?.value;
    user.first_name = this.registerFrom.get('firstName')?.value;
    user.last_name = this.registerFrom.get('lastName')?.value;
    // user.phone = this.getFullPhoneNumber()
    this.authService.register(user).subscribe({
      next: data => {
        console.log(data);
        this.login(user);
      },
      error: error => {
        console.error(error);

        if(error.status===400){
          this.registerFrom.get('email')?.setErrors({emailExists: true});
        }
      }
    });
  }

  login(user: User): void {
    let loginUser = new LoginUser();
    loginUser.email = user.email;
    loginUser.password = user.password;
    this.authService.login(loginUser).subscribe({
      next: data => {
        console.log(data);
        this.storageService.setTokens(data.access, data.refresh);
        this.storageService.setRoles(data.roles);
        this.router.navigate(['home'])
      },
      error: error => {
        console.error(error);
      }
    });
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.registerFrom.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  formatPhoneNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const country = this.registerFrom.get('countryCode')?.value;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Use libphonenumber-js's AsYouType formatter to format the input
    const formatter = new AsYouType(country);
    value = formatter.input(value);

    // Limit to a maximum of 15 characters
    input.value = value.slice(0, 15);
  }

  getFullPhoneNumber(): string|null {
    const country = this.registerFrom.get('countryCode')?.value;
    const phoneNumber = this.registerFrom.get('phoneNumber')?.value;
    // const fullPhoneNumber = `+${parsePhoneNumber(phoneNumber, country).countryCallingCode} ${phoneNumber}`;
    // return fullPhoneNumber;

    if (phoneNumber === null || phoneNumber === '') {
      return null
    }

    const fullPhoneNumber = parsePhoneNumber(phoneNumber, country).number
    return fullPhoneNumber;
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const country = control.parent ? control.parent.get('countryCode')?.value : null;

      if (!phoneNumber || !country) {
        return null; // If the control or country code is empty, consider it valid.
      }

      try {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber, country);
        if (!parsedPhoneNumber.isValid()) {
          return {invalidPhoneNumber: true};
        }
      } catch (error) {
        return {invalidPhoneNumber: true};
      }

      return null;
    };
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
  getCountriesWithCodesSortedByCallingCode(): CountryCode[] {
    const countries = this.getCountries();

    return countries.sort((a, b) => {
      const callingCodeA = this.getCountryCallingCode(a);
      const callingCodeB = this.getCountryCallingCode(b);

      if (callingCodeA < callingCodeB) {
        return -1;
      } else if (callingCodeA > callingCodeB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
