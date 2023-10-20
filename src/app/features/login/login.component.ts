import {Component, Inject} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  forgotPasswordLink: string = '/forgot-password'; // Ustaw link w zależności od potrzeb.
  GoogleLink: string = '/google'; // Ustaw link w zależności od potrzeb.
  MicrosoftLink: string = '/microsofr'; // Ustaw link w zależności od potrzeb.

  private authService: AuthService;
  loginForm: FormGroup;

  errorMessages = {
    email: [
      { type: 'required', message: 'Email jest wymagany' },
      { type: 'email', message: 'Proszę wprowadzić poprawyny email' }
    ],
    password: [
      { type: 'required', message: 'Hasło jest wymagane' },
    ]
  };

  constructor(@Inject(AuthService) authService: AuthService, formBuilder: FormBuilder) {
    this.authService = authService;
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // loginUser() {
  //   // @ts-ignore
  //   const email = this.loginForm.get('email').value;
  //   // @ts-ignore
  //   const password = this.loginForm.get('password').value;
  //
  //   this.authService.login(email, password)(
  //     (response: any) => {
  //       console.log(response);
  //       // Tutaj można dodać przekierowanie na inną stronę po zalogowaniu.
  //     },
  //     (error: any) => {
  //       console.error('Błąd logowania:', error);
  //       // Tutaj można obsłużyć błędy logowania.
  //     }
  //   );
  // }
}
