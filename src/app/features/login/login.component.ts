import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../register/user.model";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {StorageService} from "../../core/storage/storage.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  showError:Boolean = false;
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
              formBuilder: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.socialAuthService = socialAuthService;
    this.authService = authService;
    this.storageService = storageService;
    this.router = router;
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.authService.loginGoogle(user.idToken).pipe().subscribe({
        next: data => {
          this.storageService.setTokens(data.access, data.refresh);
          this.router.navigate(['home'])
        },
        error: error => {
          this.toastr.error('Ups, nie udało się zalogowoać', 'Error');
        }
      });
    });
  }

  login(): void {
    let user = new LoginUser();
    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;
    this.spinner.show();
    this.authService.login(user).subscribe({
      next: data => {
        this.toastr.success('Zalogowano!', 'Sukces');
        this.storageService.setTokens(data.access, data.refresh);
        this.storageService.setRoles(data.roles);
        this.spinner.hide();
        this.router.navigate(['home'])
      },
      error: error => {
        this.toastr.error('Ups, nie udało się zalogowoać', 'Error');
        this.showError=true;
        this.spinner.hide();
      }
    });
  }

  navigate(path: string) {
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
}
