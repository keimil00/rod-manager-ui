import {Component, Inject} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private authService: AuthService;

  constructor(@Inject(AuthService) authService: AuthService){
    this.authService = authService;
  }

  registerUser() {
    this.authService.register().pipe()
      .subscribe(
        (response: any) => {
          console.log(response);
        });
  }

}
