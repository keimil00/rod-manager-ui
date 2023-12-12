import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";
import {AuthService} from "../auth/auth.service";
import {Role} from "../../features/register/user.model";
import {StorageService} from "../storage/storage.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Profile} from "../../features/Profile";
import {UserInfoService} from "../../features/user-info/user-info.service";
import {FontService} from "../font.service";

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent {
  isInGardenInfoComponent: boolean = false;
  isInHomeComponent: boolean = false;
  isInCalendarComponent: boolean = false;
  isInVotingComponent: boolean = false;
  isInMyGardenPlotInfoComponent: boolean = false;
  isInGardenOffers: boolean = false;
  isBigFont: boolean = false;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;


  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private breakpointObserver: BreakpointObserver,
    private userInfoService: UserInfoService,
    private fontService: FontService
  ) {
    this.router = router;
    this.authService = authService;
    this.storageService = storageService;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlSegments = this.router.url.split('/');
        this.isInGardenInfoComponent = urlSegments.includes('garden-info');
        this.isInHomeComponent = urlSegments.includes('home');
        this.isInMyGardenPlotInfoComponent = urlSegments.includes('my-garden-plot-info');
        this.isInCalendarComponent = urlSegments.includes('calendar');
        this.isInVotingComponent = urlSegments.includes('voting');
        this.isInGardenOffers = urlSegments.includes('garden-offers');
      }
    });
    this.breakpointObserver.observe('(max-width: 1000px)').subscribe(result => {
      this.isWideScreen = result.matches;
    });
  }

  isWideScreen = false;


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

  navigateToProfileComponent() {
    let id: number;
    this.userInfoService.getMyProfile().subscribe((result: Profile) => {
      id = result.id;
      this.router.navigate(['/user-info', id]);
    });
  }

  protected readonly Role = Role;

  changeFont() {
    this.isBigFont = !this.isBigFont;
    if (this.isBigFont) {
      this.fontService.setBigSize();
      this.adjustStylesForBigFont();
    } else {
      this.fontService.setNormalSize();
      this.adjustStylesForNormalFont();
    }
  }

  adjustStylesForBigFont() {
    const toolbar = document.querySelector('.mat-toolbar');
    if (toolbar) {
      toolbar.classList.add('big-font-styles');
      if (window.innerWidth <= 800) {
        toolbar.classList.add('responsive-big-font-styles');
      }
    }
  }

  adjustStylesForNormalFont() {
    const toolbar = document.querySelector('.mat-toolbar');
    if (toolbar) {
      toolbar.classList.remove('big-font-styles');
      toolbar.classList.remove('responsive-big-font-styles');
    }
  }

}
