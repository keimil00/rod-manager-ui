import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";
import {AuthService} from "../auth/auth.service";
import {Role} from "../../features/register/user.model";
import {StorageService} from "../storage/storage.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent {
  isInGardenInfoComponent: boolean = false;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private router: Router,
              private storageService: StorageService,
              private authService: AuthService,
              private socialAuthService: SocialAuthService,) {
    this.router = router;
    this.authService = authService;
    this.storageService = storageService;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlSegments = this.router.url.split('/');
        this.isInGardenInfoComponent = urlSegments.includes('garden-info');
      }
    });
  }

  // isAuthenticated(requiredRoles) {
  //
  // }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isLoggedIn(): boolean {
    return this.storageService.getLoggedIn();
  }

  logout(): void {
    // this.socialAuthService.signOut();
    this.authService.logout();
  }

  navigateToProfileComponent(id: string) {
    this.router.navigate(['/user-info', id]);
  }

  protected readonly Role = Role;
}
