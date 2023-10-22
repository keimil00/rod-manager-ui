import {Component, Inject} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginUser, User} from "../register/user.model";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {StorageService} from "../../core/storage/storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  forgotPasswordLink: string = '/forgot-password'; // Ustaw link w zależności od potrzeb.
  GoogleLink: string = '/google'; // Ustaw link w zależności od potrzeb.

  loginForm: FormGroup;

  errorMessages = {
    email: [
      {type: 'required', message: 'Email jest wymagany'},
      {type: 'email', message: 'Proszę wprowadzić poprawyny email'}
    ],
    password: [
      {type: 'required', message: 'Hasło jest wymagane'},
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
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log('User: ' + JSON.stringify(user));
    });
  }


  login(): void {
    console.log('Login');
    console.log(this.loginForm.value);
    let user = new LoginUser();
    user.username = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;
    this.authService.login(user).subscribe({
      next: data => {
        console.log(data);
        this.storageService.setTokens(data);
        this.router.navigate(['home'])
      },
      error: error => {
        console.error(error);
      }
    });
  }

  navigate(path: string){
    this.router.navigate([path]);
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.loginForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        console.log(user);
        // Now you have access to user's information like name, email, etc.
        // Send this information to your Django backend.
      })
      .catch(error => {
        console.error(error);
      });
  }
}
