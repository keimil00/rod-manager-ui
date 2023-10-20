import {Component, Inject} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private authService: AuthService;
  registerFrom: FormGroup;

  errorMessages = {
    firstName: [
      { type: 'required', message: 'First Name is required' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ],
    phoneNumber: [
      { type: 'pattern', message: 'Please enter a valid phone number (9 digits)' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm Password is required' },
      { type: 'passwordMismatch', message: 'Passwords do not match' }
    ]
  };


  constructor(@Inject(AuthService) authService: AuthService, formBuilder: FormBuilder) {
    this.authService = authService;
    this.registerFrom = formBuilder.group({
      firstName: ['', Validators.required, Validators.maxLength(30)],
      lastName: ['', Validators.required, Validators.maxLength(30)],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern('^$|^\d{9}$')],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', Validators.required],
    });
  }

  registerUser() {
    this.authService.register().pipe()
      .subscribe(
        (response: any) => {
          console.log(response);
        });
  }

}
